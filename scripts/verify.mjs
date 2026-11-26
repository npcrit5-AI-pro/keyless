#!/usr/bin/env node
// Live-verifies every Keyless source: runs its sample query through the same classic
// scripts index.html loads, checks for a parseable non-empty result, and checks that
// browsers would be allowed to read direct (non-proxy) responses cross-origin.
// Writes reports/verification.md and reports/verification.json.
//
//   node scripts/verify.mjs              verify everything, write reports
//   node scripts/verify.mjs --only a,b   verify a subset (reports still written)
//   node scripts/verify.mjs --no-report  print results only
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { AsyncLocalStorage } from 'node:async_hooks';
import { fileURLToPath } from 'node:url';
import { createKeylessServer } from '../server.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const onlyArg = args.indexOf('--only');
const only = onlyArg >= 0 ? new Set(args[onlyArg + 1].split(',')) : null;
const writeReport = !args.includes('--no-report') && !only;
const CONCURRENCY = 8;
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
      if (attempt < 2) await new Promise(r => setTimeout(r, throttled ? 15000 : 2000));
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

const targets = K.sources.filter(s => !only || only.has(s.id));
const started = Date.now();
const results = await pool(targets, CONCURRENCY, async src => {
  const r = await checkSource(src);
  const tag = r.ok ? 'PASS' : 'FAIL';
  console.log(`${tag} ${src.id.padEnd(22)} ${r.ok ? `${r.count} result(s): ${r.first}` : r.error}`);
  return { id: src.id, name: src.name, category: src.category, proxy: src.proxy, sample: src.sample, ...r };
});
server.close();

const pass = results.filter(r => r.ok);
const fail = results.filter(r => !r.ok);
const catLabel = Object.fromEntries(K.categories.map(c => [c.key, c.label]));
console.log(`\n${pass.length}/${results.length} passed in ${Math.round((Date.now() - started) / 1000)}s`);

if (writeReport) {
  const date = new Date().toISOString().slice(0, 10);
  const byCat = K.categories.map(c => {
    const rows = results.filter(r => r.category === c.key);
    return `| ${c.label} | ${rows.filter(r => r.ok).length} | ${rows.filter(r => !r.ok).length} |`;
  });
  const row = r => `| ${r.ok ? 'PASS' : 'FAIL'} | ${r.name} | \`${r.id}\` | ${catLabel[r.category]} | ${r.proxy ? 'proxy' : 'direct'} | ${r.ok ? `${r.count} · ${r.first.replace(/\|/g, '/')}` : r.error.replace(/\|/g, '/')} |`;
  const md = [
    '# Verification report',
    '',
    `Run on ${date} with \`node scripts/verify.mjs\`. Each source ran its sample query live.`,
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
    '| Result | Name | Id | Category | Access | Detail |',
    '| --- | --- | --- | --- | --- | --- |',
    ...results.slice().sort((a, b) => a.category.localeCompare(b.category) || a.id.localeCompare(b.id)).map(row),
    '',
  ].join('\n');
  fs.mkdirSync(path.join(ROOT, 'reports'), { recursive: true });
  fs.writeFileSync(path.join(ROOT, 'reports', 'verification.md'), md);
  fs.writeFileSync(path.join(ROOT, 'reports', 'verification.json'), JSON.stringify({ date, passed: pass.length, total: results.length, results }, null, 2) + '\n');
}

if (fail.length) process.exitCode = 1;
