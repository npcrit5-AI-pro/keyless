/* Keyless router: scores sources by weighted keyword hits, detects category intent,
 * and picks a small, category-diverse set to query. Pure function, no DOM access. */
(function (root) {
  'use strict';
  const K = root.Keyless;

  K.route = function (query, opts = {}) {
    const max = opts.maxSources || K.config.maxSources;
    const perCategory = opts.perCategory || K.config.perCategory;
    const q = K.norm(query);
    const hitsIn = list => list.filter(k => k.re.test(q));
    const weight = list => list.reduce((n, k) => n + k.weight, 0);

    const available = K.sources.filter(s => !s.proxy || K.config.proxy);

    const intent = {};
    for (const c of K.categories) {
      const hits = hitsIn(c.kw);
      intent[c.key] = { score: weight(hits), hits: hits.map(k => k.phrase) };
    }
    const intents = K.categories.filter(c => intent[c.key].score > 0).map(c => c.label);

    const scored = available.map(source => {
      const own = hitsIn(source.kw);
      const cat = intent[source.category];
      const score = weight(own) + 0.5 * cat.score;
      return { source, score, hits: own.length ? own.map(k => k.phrase) : cat.hits };
    }).filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score || b.source.rank - a.source.rank || a.source.name.localeCompare(b.source.name));

    const picks = [];
    const used = {};
    for (const x of scored) {
      if (picks.length >= max) break;
      if ((used[x.source.category] || 0) >= perCategory) continue;
      used[x.source.category] = (used[x.source.category] || 0) + 1;
      picks.push(x);
    }

    const fallback = !scored.length;
    const general = available.filter(s => s.general);
    for (const g of general) {
      if (picks.length >= Math.max(2, fallback ? 3 : 2)) break;
      if (picks.some(p => p.source === g)) continue;
      picks.push({ source: g, score: 0, hits: [] });
    }

    return { fallback, intents, picks, available: available.length, total: K.sources.length };
  };
})(typeof window !== 'undefined' ? window : globalThis);
