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
  K.register('news', {
    id: 'hn-firebase-top', name: 'Hacker News (Firebase top stories)', home: 'https://news.ycombinator.com/',
    kw: 'hacker_news_top:3 hn_top:3 hackernews_stories:3 top_stories:2 hacker_news_firebase:3',
    sample: 'top stories',
    run: async () => {
      const ids = (await K.http('https://hacker-news.firebaseio.com/v0/topstories.json')).slice(0, 5);
      const items = await Promise.all(ids.map(id => K.http(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)));
      return items.filter(Boolean).map(i => ({
        title: i.title,
        body: `${i.score ?? 0} points · ${i.by || 'anon'} · ${i.descendants ?? 0} comments`,
        link: i.url || `https://news.ycombinator.com/item?id=${i.id}`,
        facts: [['Score', String(i.score ?? 0)]],
      }));
    },
  });
})(Keyless);
