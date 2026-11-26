(function (K) {
  'use strict';

  K.category('news', 'News & tech', [
    {
      id: 'hackernews', name: 'Hacker News (Algolia)', home: 'https://news.ycombinator.com/', general: true,
      kw: 'news:3 tech:2 hacker:3 startup:2 startups:2 programming:2 trending:2 latest:1 discussion:2 hn:3',
      sample: 'hacker news rust',
      url: q => `https://hn.algolia.com/api/v1/search?tags=story&hitsPerPage=5&query=${K.enc(K.term(q))}`,
      list: 'hits',
      title: h => h.title || '(untitled)',
      body: h => `${h.points} points · ${h.num_comments} comments`,
      link: h => h.url || `https://news.ycombinator.com/item?id=${h.objectID}`,
    },
    {
      id: 'lobsters', name: 'Lobsters', home: 'https://lobste.rs/', proxy: true,
      kw: 'lobsters:3 lobste:2 tech_news:2 programming_news:2',
      sample: 'lobsters',
      url: () => 'https://lobste.rs/hottest.json',
      list: d => d.slice(0, 5),
      title: 'title',
      body: x => `${x.score} points · ${x.comment_count} comments`,
      link: x => x.url || x.comments_url,
    },
  ]);
})(Keyless);
