#!/usr/bin/env node
// Zero-dependency static server for Keyless, plus an allowlisted same-origin proxy
// for catalog sources that do not send CORS headers.
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const MAX_BYTES = 5 * 1024 * 1024;
const MAX_HOPS = 4;
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

export async function catalogHosts(root = ROOT) {
  const hosts = new Set();
  for (const dir of ['core', 'apis']) {
    for (const f of await fs.readdir(path.join(root, dir))) {
      if (!f.endsWith('.js')) continue;
      const text = await fs.readFile(path.join(root, dir, f), 'utf8');
      for (const m of text.matchAll(/https:\/\/([a-z0-9.-]+)/gi)) hosts.add(m[1].toLowerCase());
    }
  }
  return hosts;
}

function send(res, status, body, headers = {}) {
  res.writeHead(status, { 'cache-control': 'no-store', ...headers });
  res.end(body);
}

async function proxy(req, res, url, allow) {
  const raw = url.searchParams.get('url') || '';
  let target;
  try { target = new URL(raw); } catch { return send(res, 400, 'Bad url'); }
  const ok = u => u.protocol === 'https:' && allow.has(u.hostname.toLowerCase());
  if (!ok(target)) return send(res, 403, 'Host not in the Keyless allowlist');

  let current = target;
  for (let hop = 0; hop <= MAX_HOPS; hop++) {
    let upstream;
    try {
      upstream = await fetch(current, {
        redirect: 'manual',
        headers: { 'user-agent': 'keyless-proxy/1.0', accept: 'application/json, text/plain, */*' },
        signal: AbortSignal.timeout(8000),
      });
    } catch (e) {
      return send(res, 502, 'Upstream unreachable');
    }
    const loc = upstream.headers.get('location');
    if (upstream.status >= 300 && upstream.status < 400 && loc) {
      const next = new URL(loc, current);
      if (!ok(next)) return send(res, 403, 'Redirect to a host not in the allowlist');
      current = next;
      continue;
    }
    const buf = Buffer.from(await upstream.arrayBuffer());
    if (buf.length > MAX_BYTES) return send(res, 502, 'Upstream response too large');
    return send(res, upstream.status, buf, {
      'content-type': upstream.headers.get('content-type') || 'application/octet-stream',
    });
  }
  return send(res, 502, 'Too many redirects');
}

export function createKeylessServer({ root = ROOT, allow } = {}) {
  const hostsPromise = allow ? Promise.resolve(allow) : catalogHosts(root);
  return http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost');
      if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, 'Method not allowed');

      if (url.pathname === '/__keyless/status') {
        const hosts = await hostsPromise;
        return send(res, 200, JSON.stringify({ proxy: true, hosts: hosts.size }), { 'content-type': 'application/json' });
      }
      if (url.pathname === '/proxy') return proxy(req, res, url, await hostsPromise);

      const rel = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
      const file = path.normalize(path.join(root, rel));
      if (!file.startsWith(root + path.sep) || path.basename(file).startsWith('.')) return send(res, 403, 'Forbidden');
      const body = await fs.readFile(file).catch(() => null);
      if (!body) return send(res, 404, 'Not found');
      return send(res, 200, body, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream' });
    } catch (e) {
      return send(res, 500, 'Server error');
    }
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const port = Number(process.env.PORT) || 3000;
  const server = createKeylessServer();
  server.listen(port, '0.0.0.0', () => {
    console.log(`Keyless running at http://localhost:${port} (proxy enabled for catalog hosts)`);
  });
}
