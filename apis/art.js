(function (K) {
  'use strict';
  const enc = K.enc;

  K.category('art', 'Art & museums', [
    {
      id: 'artic', name: 'Art Institute of Chicago', home: 'https://api.artic.edu/docs/',
      kw: 'art:3 artwork:3 artworks:3 painting:3 paintings:3 museum:3 museums:3 artist:2 sculpture:2 gallery:2 artic:3 monet:2 van_gogh:2',
      sample: 'impressionism',
      url: q => `https://api.artic.edu/api/v1/artworks/search?q=${enc(K.term(q))}&limit=5&fields=id,title,artist_display,date_display`,
      list: 'data',
      title: a => a.title,
      body: a => `${a.artist_display || ''} · ${a.date_display || ''}`.replace(/^ · | · $/g, ''),
      link: a => `https://www.artic.edu/artworks/${a.id}`,
    },
    {
      id: 'met', name: 'Met Museum Collection', home: 'https://metmuseum.github.io/',
      kw: 'met_museum:3 metropolitan:3 met:2 metmuseum:3 museum_collection:2',
      sample: 'sunflowers',
      run: async q => {
        const s = await K.http(`https://collectionapi.metmuseum.org/public/collection/v1.1/search?hasImages=true&q=${enc(K.term(q))}`);
        K.need(s.total, 'No Met objects matched.');
        const ids = s.objectIDs.slice(0, 5);
        const objs = await Promise.all(ids.map(id => K.http(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`).catch(() => null)));
        return objs.filter(Boolean).map(o => ({
          title: o.title,
          body: `${o.artistDisplayName || 'Unknown artist'} · ${o.objectDate || ''}`,
          link: o.objectURL,
        }));
      },
    },
  ], {
    kw: 'museum:2 exhibition:2 exhibit:1',
  });
})(Keyless);
