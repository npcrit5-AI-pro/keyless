# Keyless

Keyless is a search box that routes your question to the free web APIs most likely to answer it, queries them in parallel, and lays the results out by category. Every source needs no API key and no sign-up.

**Sources: 303, all live-verified** (see [`reports/verification.md`](reports/verification.md)).

## Run it

Option 1: open the page directly.

```bash
open index.html        # or double-click it in your file browser
```

Sources that allow browser requests (CORS) work straight from the file. Proxy-only sources are shown as skipped in the results line.

Option 2: run the local server, which also enables the proxy-only sources.

```bash
node server.js         # or: npm start
# then visit http://localhost:3000   (set PORT to change it)
```

Requires Node.js 18 or newer. There are no dependencies to install.

## How it works

- `index.html` is the UI only. It loads classic scripts, so it also works from `file://`.
- `core/keyless.js` holds the registry, the shared helpers (`K.http` with a 6 s timeout, `K.geocode`, `K.term`), and the declarative source format.
- `core/router.js` scores each source by weighted keyword hits plus a category intent score, then picks the top sources (up to 5, at most 2 per category). Sources that are proxy-only are excluded when no proxy is available.
- `apis/*.js` holds the catalog, one file per category (`books`, `weather`, `finance`, ...).
- `server.js` is a zero-dependency static server with a `/proxy?url=` endpoint. The proxy only forwards to hosts that appear in the catalog, and only over HTTPS.

## Add a source

Add an entry to the matching `apis/<category>.js` file. The simplest form is a declarative spec:

```js
K.register('weather', {
  id: 'my-source',                       // unique across the catalog
  name: 'My Source',
  home: 'https://example.org/',          // must be https
  kw: 'mything:3 weather_thing:2',       // weighted routing keywords; multi-word = underscores
  sample: 'mything paris',               // query used by verify.mjs
  url: q => `https://api.example.org/search?q=${K.enc(K.term(q))}`,
  list: 'results',                       // path or function returning the array of items
  title: r => r.name,
  body: r => r.summary,
  link: r => r.url,
});
```

For anything more involved, supply `async run(q)` returning `[{ title, body, link, facts }]`. Set `proxy: true` if the API does not send CORS headers; the source is then only used when you run `node server.js`.

Keyword caution: every word in `kw` is also removed from search terms, so do not use an entity name (a place, a person, a company) as a keyword. Use the category or the service's topic words instead.

Then run the verifier:

```bash
npm run verify         # node scripts/verify.mjs
```

It checks each source's sample query live, requires at least one item with a title and an HTTP(S) link, and checks CORS for direct sources. It writes `reports/verification.md` and `reports/verification.json` (use `--no-report` to skip writing, or `--only id1,id2` to run a subset). It exits non-zero if any source fails.

To spare upstream rate limits, passing results are cached in `.cache/verify-cache.json` (git-ignored). A source is reused from the cache for 7 days while its registration text and the shared core and proxy code are unchanged; failures are never cached. Use `--all` to re-check everything.

## Notes

- Upstream services change and rate-limit. A source that passes today can fail tomorrow; re-run the verifier to see the current state.
- Sources that were dropped during verification (dead, key-gated, rate-limited to the point of being unusable for browsers, or unreachable) are not in the catalog, so the count only reflects what currently passes.
