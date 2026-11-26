(function (K) {
  'use strict';
  const enc = K.enc;

  K.category('books', 'Books & reading', [
    {
      id: 'openlibrary', name: 'Open Library', home: 'https://openlibrary.org/',
      kw: 'book:3 books:3 novel:2 novels:2 author:2 authors:2 isbn:3 library:1 reading:2 literature:2',
      sample: 'The Hobbit',
      url: q => `https://openlibrary.org/search.json?limit=5&q=${enc(K.term(q))}`,
      list: 'docs',
      title: d => d.title + (d.first_publish_year ? ` (${d.first_publish_year})` : ''),
      body: d => (d.author_name || []).slice(0, 2).join(', '),
      link: d => `https://openlibrary.org${d.key}`,
    },
    {
      id: 'archiveorg', name: 'Internet Archive', home: 'https://archive.org/',
      kw: 'archive_org:3 internet_archive:3 digitized:2 scans:2 public_domain:2 manuscript:2',
      sample: 'moby dick',
      url: q => `https://archive.org/advancedsearch.php?q=${enc(K.term(q))}&fl[]=identifier&fl[]=title&fl[]=creator&rows=5&output=json`,
      list: 'response.docs',
      title: 'title',
      body: d => [].concat(d.creator || []).slice(0, 2).join(', '),
      link: d => `https://archive.org/details/${d.identifier}`,
    },
    {
      id: 'poetrydb', name: 'PoetryDB', home: 'https://poetrydb.org/',
      kw: 'poem:3 poems:3 poetry:3 sonnet:3 sonnets:3 verse:2 poet:2',
      sample: 'poems by Shakespeare',
      url: q => `https://poetrydb.org/author/${enc(K.term(q))}`,
      list: d => (Array.isArray(d) ? d : []),
      title: 'title',
      body: d => `${d.author} · ${d.lines.length} lines`,
    },
    {
      id: 'bible', name: 'Bible API', home: 'https://bible-api.com/',
      kw: 'bible:3 scripture:3 gospel:2 psalm:2 psalms:2 proverbs:2 genesis:2 verse:1',
      sample: 'bible John 3:16',
      url: q => `https://bible-api.com/${enc(q.replace(/\b(bible|verse|scripture|passage)\b/gi, '').trim() || 'john 3:16')}`,
      list: d => [d],
      title: 'reference',
      body: 'text',
    },
  ], {
    kw: 'library:1 reading:1',
  });
})(Keyless);
