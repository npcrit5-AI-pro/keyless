(function (K) {
  'use strict';
  const enc = K.enc;

  K.category('dev', 'Developer tools', [
    {
      id: 'github', name: 'GitHub Search', home: 'https://api.github.com/', general: true,
      kw: 'github:3 repo:3 repos:3 repository:3 repositories:3 open_source:2 code:2 library:2 libraries:2 package:2 project:1 projects:1',
      sample: 'vercel next.js',
      url: q => `https://api.github.com/search/repositories?q=${enc(K.term(q))}&per_page=5&sort=stars`,
      list: 'items',
      title: 'full_name',
      body: r => `★ ${r.stargazers_count.toLocaleString()} · ${r.language || 'n/a'} · ${r.description || ''}`.slice(0, 180),
      link: 'html_url',
    },
    {
      id: 'npm', name: 'npm Registry', home: 'https://www.npmjs.com/',
      kw: 'npm:3 npmjs:3 node_package:3 node_packages:3 javascript_library:2 js_library:2',
      sample: 'express',
      url: q => `https://registry.npmjs.org/-/v1/search?text=${enc(K.term(q))}&size=5`,
      list: 'objects',
      title: o => `${o.package.name}@${o.package.version}`,
      body: o => o.package.description || '',
      link: o => o.package.links?.npm,
    },
    {
      id: 'pypi', name: 'PyPI (pypi.org JSON)', home: 'https://pypi.org/', proxy: true,
      kw: 'pypi:3 python_package:3 python_library:2 pip:3 python_packages:3',
      sample: 'requests',
      url: q => `https://pypi.org/pypi/${enc(K.term(q).replace(/\s+/g, '-'))}/json`,
      list: d => [d.info],
      title: i => `${i.name}@${i.version}`,
      body: i => i.summary || '',
      link: i => i.project_url,
    },
    {
      id: 'crates', name: 'crates.io', home: 'https://crates.io/',
      kw: 'crates:3 crate:3 cargo:3 rust_crate:3 rust_package:3 rust_library:2 crates_io:3',
      sample: 'serde',
      url: q => `https://crates.io/api/v1/crates?q=${enc(K.term(q))}&per_page=5`,
      list: 'crates',
      title: c => `${c.name}@${c.max_version}`,
      body: c => `${(c.downloads || 0).toLocaleString()} downloads · ${c.description || ''}`.slice(0, 180),
      link: c => `https://crates.io/crates/${c.name}`,
    },
    {
      id: 'packagist', name: 'Packagist (PHP)', home: 'https://packagist.org/', proxy: true,
      kw: 'packagist:3 composer:3 php_package:3 php_library:3',
      sample: 'monolog',
      url: q => `https://packagist.org/search.json?q=${enc(K.term(q))}&per_page=5`,
      list: 'results',
      title: 'name',
      body: p => `${(p.downloads || 0).toLocaleString()} downloads · ${p.description || ''}`.slice(0, 180),
      link: 'url',
    },
    {
      id: 'stackexchange', name: 'Stack Exchange (Stack Overflow)', home: 'https://api.stackexchange.com/',
      kw: 'stackoverflow:3 stack_overflow:3 stack_exchange:3 stackexchange:3 so:2 question:2 questions:2 error:2 bug:2 exception:2',
      sample: 'how to reverse a list python',
      url: q => `https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=relevance&q=${enc(K.term(q))}&site=stackoverflow&pagesize=5`,
      list: 'items',
      title: i => i.title.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&'),
      body: i => `score ${i.score} · ${i.answer_count} answers · ${i.is_answered ? 'answered' : 'open'}`,
      link: 'link',
    },
    {
      id: 'hn-comments', name: 'HN Algolia (comments)', home: 'https://hn.algolia.com/api',
      kw: 'hn_comments:3 hacker_news_comments:3 comments_hn:2',
      sample: 'postgres',
      url: q => `https://hn.algolia.com/api/v1/search?tags=comment&hitsPerPage=5&query=${enc(K.term(q))}`,
      list: 'hits',
      title: h => (h.comment_text || '').replace(/<[^>]*>/g, '').slice(0, 120),
      body: h => `by ${h.author} · ${h.story_title || ''}`,
      link: h => `https://news.ycombinator.com/item?id=${h.objectID}`,
    },
    {
      id: 'gitlab', name: 'GitLab Public Projects', home: 'https://gitlab.com/api/v4/projects',
      kw: 'gitlab:3 gitlab_repo:3 gitlab_project:3',
      sample: 'gitlab runner',
      url: q => `https://gitlab.com/api/v4/projects?search=${enc(K.term(q))}&simple=true&per_page=5&order_by=star_count`,
      list: d => d,
      title: 'path_with_namespace',
      body: p => `★ ${p.star_count} · ${p.description || ''}`.slice(0, 180),
      link: 'web_url',
    },
    {
      id: 'jsdelivr', name: 'jsDelivr Package Stats', home: 'https://www.jsdelivr.com/',
      kw: 'jsdelivr:3 cdn_package:3 npm_cdn:2 cdn:2',
      sample: 'react',
      url: q => `https://data.jsdelivr.com/v1/packages/npm/${enc(K.term(q).replace(/\s+/g, '-'))}`,
      list: d => [d],
      title: p => p.name,
      body: p => `latest ${p.latest || p.tags?.latest || ''} · ${(p.versions || []).length} versions`,
      link: p => `https://www.jsdelivr.com/package/npm/${p.name}`,
    },
    {
      id: 'mozilla-mdn', name: 'MDN Web Docs (search)', home: 'https://developer.mozilla.org/', proxy: true,
      kw: 'mdn:3 mozilla_docs:3 web_docs:3 html_reference:2 css_reference:2 javascript_reference:2 web_api:2',
      sample: 'fetch api',
      url: q => `https://developer.mozilla.org/api/v1/search?q=${enc(K.term(q))}&locale=en-US&size=5`,
      list: 'documents',
      title: d => d.title,
      body: d => (d.summary || '').slice(0, 160),
      link: d => `https://developer.mozilla.org${d.mdn_url}`,
    },
  ], {
    kw: 'developer:2 developers:2 programming:2 code:1 software:2 api:2 apis:2',
  });
  K.register('dev', {
    id: 'endoflife', name: 'endoflife.date (release cycles)', home: 'https://endoflife.date/',
    kw: 'end_of_life:3 eol:3 lts:3 release_cycle:3 support_schedule:3 release_schedule:2',
    sample: 'nodejs end of life',
    url: q => `https://endoflife.date/api/${enc(K.term(q).split(' ')[0] || 'nodejs')}.json`,
    list: d => d.slice(0, 5),
    title: (c, q) => `${K.cap(K.term(q).split(' ')[0])} ${c.cycle}`,
    body: c => `latest ${c.latest} · end of life ${c.eol}`,
    link: () => 'https://endoflife.date/',
  });
  K.register('dev', {
    id: 'bundlephobia', name: 'Bundlephobia (npm bundle size)', home: 'https://bundlephobia.com/',
    kw: 'bundle_size:3 package_size:3 bundlephobia:3 npm_size:3 minified_size:2 gzip_size:2',
    sample: 'react bundle size',
    url: q => `https://bundlephobia.com/api/size?package=${enc(K.term(q).split(' ')[0])}`,
    list: d => [d],
    title: d => `${d.name}@${d.version}`,
    body: d => `${(d.size / 1024).toFixed(1)} KB minified · ${(d.gzip / 1024).toFixed(1)} KB gzip`,
    link: d => `https://bundlephobia.com/package/${d.name}`,
  });
  K.register('dev', {
    id: 'hibp-range', name: 'Have I Been Pwned (password range)', home: 'https://haveibeenpwned.com/Passwords',
    kw: 'pwned:3 data_breach:3 password_breach:3 haveibeenpwned:3 breached_password:3',
    sample: 'pwned password check',
    run: async () => {
      const text = await K.http('https://api.pwnedpasswords.com/range/21BD1', { text: true });
      return text.trim().split('\n').slice(0, 5).map(line => {
        const [suffix, n] = line.split(':');
        return { title: `Hash suffix ${suffix}`, body: `${Number(n).toLocaleString()} breaches in this hash range`, link: 'https://haveibeenpwned.com/Passwords' };
      });
    },
  });
  K.register('dev', {
    id: 'reqres', name: 'ReqRes (mock users)', home: 'https://reqres.in/',
    kw: 'reqres:3 mock_api:3 fake_users:3 dummy_users:3 sample_users:3 mock_users:2',
    sample: 'mock users',
    url: () => 'https://reqres.in/api/users?page=2',
    list: 'data',
    title: u => `${u.first_name} ${u.last_name}`,
    body: u => u.email,
    link: u => u.avatar,
  });
  K.register('dev', {
    id: 'nodejs-releases', name: 'Node.js release index', home: 'https://nodejs.org/',
    kw: 'node_releases:3 nodejs_versions:3 node_version:3 latest_node:3 nodejs_release:3',
    sample: 'latest node version',
    url: () => 'https://nodejs.org/dist/index.json',
    list: d => d.slice(0, 5),
    title: r => `Node.js ${r.version}`,
    body: r => `${r.date}${r.lts ? ` · LTS ${r.lts}` : ''}`,
    link: () => 'https://nodejs.org/en/download',
  });
})(Keyless);
