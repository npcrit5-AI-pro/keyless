(function (K) {
  'use strict';
  const enc = K.enc;

  K.category('reference', 'Reference & encyclopedias', [
    {
      id: 'wikipedia', name: 'Wikipedia', home: 'https://en.wikipedia.org/', general: true,
      kw: 'wikipedia:3 who:1 history:2 about:1 explain:2 biography:2 biographies:2 person:1 place:1 science:1',
      sample: 'Marie Curie',
      url: q => `https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=5&format=json&origin=*&srsearch=${enc(K.term(q))}`,
      list: 'query.search',
      title: 'title',
      body: 'snippet',
      link: s => `https://en.wikipedia.org/wiki/${enc(s.title.replace(/ /g, '_'))}`,
    },
    {
      id: 'wikidata', name: 'Wikidata', home: 'https://www.wikidata.org/',
      kw: 'wikidata:3 knowledge_graph:3 entity:2 entities:2 qid:2',
      sample: 'Lisbon',
      url: q => `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${enc(K.term(q))}&language=en&format=json&origin=*&limit=5`,
      list: 'search',
      title: 'label',
      body: 'description',
      link: 'concepturi',
    },
    {
      id: 'nobel', name: 'Nobel Prize laureates', home: 'https://www.nobelprize.org/',
      kw: 'nobel:3 laureate:3 laureates:3 prize:2 prizes:2 winner:1 winners:1',
      sample: 'Nobel laureate Curie',
      url: q => `https://api.nobelprize.org/2.1/laureates?name=${enc(K.term(q))}&limit=5`,
      list: 'laureates',
      title: x => x.knownName?.en || x.fullName?.en,
      body: x => {
        const p = x.nobelPrizes?.[0];
        return p ? `${p.awardYear} · ${p.category?.en || ''}` : '';
      },
    },
  ], {
    kw: 'encyclopedia:3 encyclopaedia:3 reference:2 facts:1',
  });
})(Keyless);
