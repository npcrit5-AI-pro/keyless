#!/usr/bin/env node
// Live-verifies every Keyless source: runs its sample query through the same classic
// scripts index.html loads, checks for a parseable non-empty result, and checks that
// browsers would be allowed to read direct (non-proxy) responses cross-origin.
// Writes reports/verification.md and reports/verification.json.
//
//   node scripts/verify.mjs              re-check only new or changed sources; reuse recent passes
//   node scripts/verify.mjs --all        ignore the cache and re-check everything
//   node scripts/verify.mjs --only a,b   re-check a subset (reports are not written)
//   node scripts/verify.mjs --no-report  print results only
//
// A pass is cached in .cache/verify-cache.json for CACHE_TTL_DAYS while the source's
// registration text and the shared core/proxy code are unchanged. Failures are never
// cached. On the first run the cache is seeded from reports/verification.json.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createHash } from 'node:crypto';
import { AsyncLocalStorage } from 'node:async_hooks';
import { fileURLToPath } from 'node:url';
import { createKeylessServer } from '../server.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const onlyArg = args.indexOf('--only');
const only = onlyArg >= 0 ? new Set(args[onlyArg + 1].split(',')) : null;
const forceAll = args.includes('--all');
const writeReport = !args.includes('--no-report') && !only;
const CONCURRENCY = 4;
const PAUSE_MS = 250;
const CACHE_TTL_DAYS = 7;
const CACHE_FILE = path.join(ROOT, '.cache', 'verify-cache.json');
const REPORT_JSON = path.join(ROOT, 'reports', 'verification.json');
const ORIGIN = 'https://keyless.example';

globalThis.window = globalThis;
const USER_AGENT = 'Keyless-verify/1.0 (free API checker; https://github.com)';
const realFetch = globalThis.fetch.bind(globalThis);
const recorder = new AsyncLocalStorage();
const withAgent = headers => {
  const h = new Headers(headers);
  if (!h.has('user-agent')) h.set('user-agent', USER_AGENT);
  return h;
};
globalThis.fetch = (input, init = {}) => {
  const log = recorder.getStore();
  const url = typeof input === 'string' ? input : input.url;
  const headers = new Headers(init.headers);
  if (log) log.push({ url, method: (init.method || 'GET').toUpperCase(), headers, body: init.body });
  return realFetch(input, { ...init, headers: withAgent(headers) });
};

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m => m[1]);
if (!scripts.length) throw new Error('index.html loads no classic scripts');
for (const s of scripts) vm.runInThisContext(fs.readFileSync(path.join(ROOT, s), 'utf8'), { filename: s });
const K = globalThis.Keyless;

const server = createKeylessServer({ root: ROOT });
await new Promise(r => server.listen(0, '127.0.0.1', r));
K.config.proxy = `http://127.0.0.1:${server.address().port}`;
K.config.timeoutMs = 15000;

const sha = s => createHash('sha1').update(s).digest('hex');
const sleep = ms => new Promise(r => setTimeout(r, ms));
const today = () => new Date().toISOString().slice(0, 10);

function fingerprints() {
  const shared = sha(['core/keyless.js', 'core/router.js', 'server.js']
    .map(f => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n'));
  const out = new Map();
  for (const file of fs.readdirSync(path.join(ROOT, 'apis')).filter(f => f.endsWith('.js'))) {
    const text = fs.readFileSync(path.join(ROOT, 'apis', file), 'utf8');
    const hits = [...text.matchAll(/\bid: '([^']+)'/g)];
    hits.forEach((m, i) => {
      const end = i + 1 < hits.length ? hits[i + 1].index : text.length;
      out.set(m[1], sha(shared + text.slice(m.index, end)));
    });
  }
  return out;
}

function loadCache(fps) {
  if (fs.existsSync(CACHE_FILE)) return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
  const cache = {};
  if (fs.existsSync(REPORT_JSON)) {
    const report = JSON.parse(fs.readFileSync(REPORT_JSON, 'utf8'));
    for (const r of report.results) {
      if (r.ok && fps.has(r.id)) {
        cache[r.id] = { fp: fps.get(r.id), at: report.date, count: r.count, first: r.first };
      }
    }
  }
  return cache;
}

const isFresh = entry => Date.now() - Date.parse(entry.at) < CACHE_TTL_DAYS * 864e5;

function lint() {
  const problems = [];
  const seen = new Set();
  const cats = new Set(K.categories.map(c => c.key));
  for (const s of K.sources) {
    if (seen.has(s.id)) problems.push(`${s.id}: duplicate id`);
    seen.add(s.id);
    if (!cats.has(s.category)) problems.push(`${s.id}: unknown category ${s.category}`);
    if (!s.kw.length) problems.push(`${s.id}: no keywords`);
    if (!s.sample) problems.push(`${s.id}: no sample query`);
    if (!/^https:\/\//.test(s.home || '')) problems.push(`${s.id}: home must be https`);
    if (!s.name) problems.push(`${s.id}: no name`);
  }
  return problems;
}

function validate(items) {
  if (!Array.isArray(items) || items.length === 0) throw new Error('no results');
  for (const it of items) {
    if (typeof it.title !== 'string' || !it.title.trim()) throw new Error('result without title');
    if (!/^https?:\/\//.test(it.link || '')) throw new Error('result without http(s) link');
  }
}

function isSimple(call) {
  if (call.method === 'GET' || call.method === 'HEAD') return true;
  const ct = new Headers(call.headers).get('content-type') || '';
  return call.method === 'POST' && /^(application\/x-www-form-urlencoded|text\/plain|multipart\/form-data)/.test(ct);
}

async function corsCheck(call) {
  const headers = new Headers(call.headers);
  const allowOrigin = r => {
    const v = r.headers.get('access-control-allow-origin');
    return v === '*' || v === ORIGIN;
  };
  if (isSimple(call)) {
    headers.set('origin', ORIGIN);
    const r = await realFetch(call.url, { method: call.method, headers: withAgent(headers), body: call.body });
    await r.body?.cancel();
    if (!r.ok) throw new Error(`HTTP ${r.status} for ${call.url}`);
    if (!allowOrigin(r)) throw new Error(`no CORS allow-origin on ${new URL(call.url).host}`);
    return;
  }
  const pre = await realFetch(call.url, {
    method: 'OPTIONS',
    headers: {
      origin: ORIGIN,
      'access-control-request-method': call.method,
      'access-control-request-headers': [...headers.keys()].join(','),
    },
  });
  await pre.body?.cancel();
  if (!allowOrigin(pre)) throw new Error(`no CORS preflight allow-origin on ${new URL(call.url).host}`);
}

async function checkSource(src) {
  let lastError = 'unknown';
  for (let attempt = 1; attempt <= 2; attempt++) {
    const log = [];
    try {
      const items = await recorder.run(log, () => K.withTimeout(src.run(src.sample), 20000));
      validate(items);
      if (!src.proxy) {
        for (const call of log) await K.withTimeout(corsCheck(call), 15000);
      }
      return { ok: true, count: items.length, first: items[0].title, attempts: attempt };
    } catch (e) {
      lastError = e.message;
      const throttled = /HTTP (429|503)/.test(e.message);
      if (attempt < 2) await sleep(throttled ? 15000 : 2000);
    }
  }
  return { ok: false, error: lastError };
}

async function pool(items, n, fn) {
  const out = new Array(items.length);
  let next = 0;
  await Promise.all(Array.from({ length: n }, async () => {
    while (next < items.length) {
      const i = next++;
      out[i] = await fn(items[i]);
    }
  }));
  return out;
}

const problems = lint();
if (problems.length) {
  console.error('Lint failed:\n  ' + problems.join('\n  '));
  process.exit(1);
}

const fps = fingerprints();
const cache = loadCache(fps);
const targets = K.sources.filter(s => !only || only.has(s.id));
const started = Date.now();
const results = await pool(targets, CONCURRENCY, async src => {
  const base = { id: src.id, name: src.name, category: src.category, proxy: src.proxy, sample: src.sample };
  const entry = cache[src.id];
  if (!only && !forceAll && entry && entry.fp === fps.get(src.id) && isFresh(entry)) {
    console.log(`CACHED ${src.id.padEnd(22)} ${entry.count} result(s), verified ${entry.at}`);
    return { ...base, ok: true, count: entry.count, first: entry.first, cached: true, verifiedAt: entry.at };
  }
  await sleep(PAUSE_MS);
  const r = await checkSource(src);
  console.log(`${r.ok ? 'PASS' : 'FAIL'} ${src.id.padEnd(22)} ${r.ok ? `${r.count} result(s): ${r.first}` : r.error}`);
  return { ...base, ...r, cached: false, verifiedAt: today() };
});
server.close();

for (const r of results) {
  if (r.cached) continue;
  if (r.ok) cache[r.id] = { fp: fps.get(r.id), at: r.verifiedAt, count: r.count, first: r.first };
  else delete cache[r.id];
}
for (const id of Object.keys(cache)) if (!fps.has(id)) delete cache[id];
fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2) + '\n');

const pass = results.filter(r => r.ok);
const fail = results.filter(r => !r.ok);
const live = results.filter(r => !r.cached).length;
const catLabel = Object.fromEntries(K.categories.map(c => [c.key, c.label]));
console.log(`\n${pass.length}/${results.length} passed in ${Math.round((Date.now() - started) / 1000)}s (${live} checked live, ${results.length - live} from cache)`);

if (writeReport) {
  const date = today();
  const byCat = K.categories.map(c => {
    const rows = results.filter(r => r.category === c.key);
    return `| ${c.label} | ${rows.filter(r => r.ok).length} | ${rows.filter(r => !r.ok).length} |`;
  });
  const row = r => `| ${r.ok ? 'PASS' : 'FAIL'} | ${r.name} | \`${r.id}\` | ${catLabel[r.category]} | ${r.proxy ? 'proxy' : 'direct'} | ${r.verifiedAt} | ${r.ok ? `${r.count} · ${r.first.replace(/\|/g, '/')}` : r.error.replace(/\|/g, '/')} |`;
  const md = [
    '# Verification report',
    '',
    `Generated ${date} with \`node scripts/verify.mjs\`. Each source ran its sample query live (or was reused from the cache because its code is unchanged and it passed within the last ${CACHE_TTL_DAYS} days).`,
    'A source passes when the query returns at least one item with a title and an http(s) link,',
    'and, for direct sources, every request it makes is answered with a CORS allow-origin header.',
    '',
    `**Result: ${pass.length} of ${results.length} sources passed.**`,
    '',
    '## By category',
    '',
    '| Category | Pass | Fail |',
    '| --- | ---: | ---: |',
    ...byCat,
    '',
    '## All sources',
    '',
    '| Result | Name | Id | Category | Access | Last verified | Detail |',
    '| --- | --- | --- | --- | --- | --- | --- |',
    ...results.slice().sort((a, b) => a.category.localeCompare(b.category) || a.id.localeCompare(b.id)).map(row),
    '',
  ].join('\n');
  fs.mkdirSync(path.join(ROOT, 'reports'), { recursive: true });
  fs.writeFileSync(path.join(ROOT, 'reports', 'verification.md'), md);
  fs.writeFileSync(REPORT_JSON, JSON.stringify({ date, passed: pass.length, total: results.length, results }, null, 2) + '\n');
}

if (fail.length) process.exitCode = 1;
