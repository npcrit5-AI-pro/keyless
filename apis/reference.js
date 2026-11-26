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
  K.register('reference', {
    id: 'wikipedia-fr', name: 'Wikipédia (French summary)', home: 'https://fr.wikipedia.org/',
    kw: 'french_wikipedia:3 wikipedia_fr:3 encyclopedie_francaise:3 wikipedia_francais:3',
    sample: 'Paris',
    url: q => `https://fr.wikipedia.org/api/rest_v1/page/summary/${enc(K.cap(K.term(q)).replace(/ /g, '_'))}`,
    list: d => [d],
    title: d => d.title,
    body: d => (d.extract || '').slice(0, 180),
    link: d => d.content_urls?.desktop?.page,
  });
  K.register('reference', {
    id: 'wikipedia-de', name: 'Wikipedia (German summary)', home: 'https://de.wikipedia.org/',
    kw: 'german_wikipedia:3 wikipedia_de:3 deutsche_wikipedia:3',
    sample: 'Berlin',
    url: q => `https://de.wikipedia.org/api/rest_v1/page/summary/${enc(K.cap(K.term(q)).replace(/ /g, '_'))}`,
    list: d => [d],
    title: d => d.title,
    body: d => (d.extract || '').slice(0, 180),
    link: d => d.content_urls?.desktop?.page,
  });
  K.register('reference', {
    id: 'wikipedia-es', name: 'Wikipedia (Spanish summary)', home: 'https://es.wikipedia.org/',
    kw: 'spanish_wikipedia:3 wikipedia_es:3 wikipedia_espanol:3',
    sample: 'Madrid',
    url: q => `https://es.wikipedia.org/api/rest_v1/page/summary/${enc(K.cap(K.term(q)).replace(/ /g, '_'))}`,
    list: d => [d],
    title: d => d.title,
    body: d => (d.extract || '').slice(0, 180),
    link: d => d.content_urls?.desktop?.page,
  });
  K.register('reference', {
    id: 'wikipedia-it', name: 'Wikipedia (Italian summary)', home: 'https://it.wikipedia.org/',
    kw: 'italian_wikipedia:3 wikipedia_it:3',
    sample: 'Roma',
    url: q => `https://it.wikipedia.org/api/rest_v1/page/summary/${enc(K.cap(K.term(q)).replace(/ /g, '_'))}`,
    list: d => [d],
    title: d => d.title,
    body: d => (d.extract || '').slice(0, 180),
    link: d => d.content_urls?.desktop?.page,
  });
  K.register('reference', {
    id: 'wikipedia-pt', name: 'Wikipédia (Portuguese summary)', home: 'https://pt.wikipedia.org/',
    kw: 'portuguese_wikipedia:3 wikipedia_pt:3 wikipedia_portugues:3',
    sample: 'Lisboa',
    url: q => `https://pt.wikipedia.org/api/rest_v1/page/summary/${enc(K.cap(K.term(q)).replace(/ /g, '_'))}`,
    list: d => [d],
    title: d => d.title,
    body: d => (d.extract || '').slice(0, 180),
    link: d => d.content_urls?.desktop?.page,
  });
  K.register('reference', {
    id: 'wikipedia-ja', name: 'Wikipedia (Japanese summary)', home: 'https://ja.wikipedia.org/',
    kw: 'japanese_wikipedia:3 wikipedia_ja:3',
    sample: '東京',
    url: q => `https://ja.wikipedia.org/api/rest_v1/page/summary/${enc(K.term(q).replace(/ /g, '_'))}`,
    list: d => [d],
    title: d => d.title,
    body: d => (d.extract || '').slice(0, 180),
    link: d => d.content_urls?.desktop?.page,
  });
  K.register('reference', {
    id: 'alquran', name: 'Al Quran Cloud (ayah lookup)', home: 'https://alquran.cloud/',
    kw: 'quran:3 quran_verse:3 ayah:3 surah:3 holy_quran:3 quran_text:3',
    sample: 'quran 1:1',
    url: q => `https://api.alquran.cloud/v1/ayah/${enc(((q.match(/\d+\s*:\s*\d+/) || ['1:1'])[0]).replace(/\s/g, ''))}`,
    list: d => [d.data],
    title: x => x.text,
    body: x => `${x.surah?.englishName || 'Quran'} ${x.surah?.number ?? ''}:${x.numberInSurah ?? ''}`,
    link: () => 'https://alquran.cloud/',
  });
})(Keyless);
