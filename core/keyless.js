/* Keyless core: source registry, shared helpers, and HTTP with timeouts.
 * Loaded as a classic script so index.html works when opened from file://.
 * Sources live in apis/*.js and call Keyless.category(...) to register themselves. */
(function (root) {
  'use strict';
  const K = (root.Keyless = root.Keyless || {});

  K.config = { timeoutMs: 6000, maxSources: 5, perCategory: 2, proxy: null };
  K.enc = encodeURIComponent;
  K.categories = [];
  K.sources = [];
  K.routeWords = new Set();

  const GENERIC = new Set((
    'a an and are as at be by can do does for from give how i in is it me my of on or ' +
    'please show tell the to what when where which who why with about all any find get info by ' +
    'information fact facts latest current today now much many more best top random'
  ).split(' '));

  const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
  const escapeRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const norm = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const decodeEntity = (m, e) => {
    if (e[0] === '#') return String.fromCodePoint(e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
    return ENTITIES[e.toLowerCase()] ?? m;
  };
  const clean = v => (v == null ? '' : String(v)
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(#\d+|#x[\da-f]+|[a-z]+);/gi, decodeEntity)
    .replace(/\s+/g, ' ').trim());
  K.norm = norm;
  K.clean = clean;

  K.need = (ok, msg) => { if (!ok) throw new Error(msg); return ok; };

  K.get = (obj, path) => (path == null || path === '' ? obj
    : String(path).split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj));

  // Query words left after dropping filler and routing keywords; '' when nothing is left.
  K.subject = function (q) {
    return norm(q).replace(/[^\p{L}\p{N} .'-]/gu, ' ').split(/\s+/)
      .filter(w => w && !GENERIC.has(w) && !K.routeWords.has(w)).join(' ');
  };

  // Like subject(), but falls back to the raw query so sources always have something to search.
  K.term = function (q) {
    return K.subject(q) || q.trim();
  };

  K.cap = s => String(s || '').replace(/\b\p{L}/gu, c => c.toUpperCase());

  // True when every word of the query (after term cleaning) appears in text.
  K.matchWords = (text, q) => {
    const words = norm(K.term(q)).split(' ').filter(Boolean);
    const t = norm(text);
    return words.length > 0 && words.every(w => t.includes(w));
  };

  // Matching items for the query, or the first few items when nothing matches.
  K.matching = (list, textOf, q, max = 5) => {
    const hits = list.filter(x => K.matchWords(textOf(x), q));
    return (hits.length ? hits : list).slice(0, max);
  };

  K.geocode = async function (place) {
    const g = await K.http(`https://geocoding-api.open-meteo.com/v1/search?count=1&name=${K.enc(place)}`);
    K.need(g.results && g.results[0], `No place found for "${place}".`);
    return g.results[0];
  };

  K.http = async function (url, opt = {}) {
    const ms = K.config.timeoutMs;
    const target = opt.proxy ? (K.config.proxy == null ? null : `${K.config.proxy}/proxy?url=${K.enc(url)}`) : url;
    if (!target) throw new Error('Needs the local proxy (run "node server.js")');
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), ms);
    try {
      const r = await fetch(target, { signal: ctl.signal, method: opt.method || 'GET', headers: opt.headers, body: opt.body });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      if (opt.text) return await r.text();
      try { return await r.json(); } catch (e) { throw new Error('Response was not JSON'); }
    } catch (e) {
      if (e.name === 'AbortError') throw new Error(`Timed out after ${ms / 1000}s`);
      throw e;
    } finally {
      clearTimeout(timer);
    }
  };

  function parseKw(str) {
    return String(str || '').split(/\s+/).filter(Boolean).map(tok => {
      const [w, n] = tok.split(':');
      const phrase = norm(w.replace(/_/g, ' '));
      return { phrase, weight: n ? Number(n) : 1, re: new RegExp(`(^|[^\\p{L}\\p{N}])${escapeRe(phrase)}($|[^\\p{L}\\p{N}])`, 'u') };
    });
  }

  function addRouteWords(kws) {
    for (const k of kws) for (const w of k.phrase.split(' ')) K.routeWords.add(w);
  }

  function buildRun(spec) {
    const max = spec.max || 5;
    const field = f => (typeof f === 'function' ? f : x => K.get(x, f));
    const title = field(spec.title);
    const body = spec.body ? field(spec.body) : null;
    const link = spec.link ? field(spec.link) : null;
    return async function run(q) {
      const url = spec.url(q);
      const init = spec.request ? spec.request(q) : {};
      const raw = await K.http(url, { ...init, text: !!spec.text, proxy: spec.proxy });
      const data = spec.parse ? spec.parse(raw, q) : raw;
      let list = typeof spec.list === 'function' ? spec.list(data, q) : K.get(data, spec.list);
      if (list == null) list = [];
      if (!Array.isArray(list)) list = [list];
      const out = [];
      for (const x of list) {
        if (out.length >= max) break;
        const t = clean(title(x, q));
        if (!t) continue;
        out.push({
          title: t,
          body: body ? clean(body(x, q)) : '',
          link: (link ? clean(link(x, q)) : '') || spec.home,
          facts: spec.facts ? spec.facts(x, q) : undefined,
        });
      }
      return out;
    };
  }

  K.register = function (category, spec) {
    if (K.sources.some(s => s.id === spec.id)) throw new Error('Duplicate source id: ' + spec.id);
    const kw = parseKw(spec.kw);
    const proxy = !!spec.proxy;
    const run = spec.run
      ? async q => (await spec.run(q, K)).filter(it => clean(it.title)).slice(0, spec.max || 5)
        .map(it => ({ title: clean(it.title), body: clean(it.body), link: it.link || spec.home, facts: it.facts }))
      : buildRun({ ...spec, proxy });
    const src = {
      id: spec.id,
      name: spec.name,
      category,
      home: spec.home,
      kw,
      sample: spec.sample,
      proxy,
      cors: !proxy,
      general: !!spec.general,
      rank: spec.rank || 0,
      run,
    };
    addRouteWords(kw);
    K.sources.push(src);
    return src;
  };

  K.category = function (key, label, specs, opts = {}) {
    const kw = parseKw(opts.kw);
    addRouteWords(kw);
    K.categories.push({ key, label, kw });
    for (const s of specs) K.register(key, s);
  };

  K.withTimeout = (promise, ms) => {
    let timer;
    const limit = new Promise((_, reject) => {
      timer = setTimeout(() => reject(new Error(`Timed out after ${ms / 1000}s`)), ms);
    });
    return Promise.race([promise, limit]).finally(() => clearTimeout(timer));
  };
})(typeof window !== 'undefined' ? window : globalThis);
