(function (K) {
  'use strict';
  const enc = K.enc;

  K.category('animals', 'Animals & nature', [
    {
      id: 'inaturalist', name: 'iNaturalist', home: 'https://www.inaturalist.org/',
      kw: 'species:3 wildlife:3 animal_species:3 biodiversity:3 inaturalist:3 observation:2 observations:2 bird:2 birds:2 insect:2 insects:2 plant:2 plants:2',
      sample: 'red fox',
      url: q => `https://api.inaturalist.org/v1/taxa?q=${enc(K.term(q))}&per_page=5&order_by=observations_count`,
      list: 'results',
      title: t => `${t.preferred_common_name ? K.cap(t.preferred_common_name) : t.name} (${t.name})`,
      body: t => `${t.rank} · ${t.observations_count.toLocaleString()} observations`,
      link: t => `https://www.inaturalist.org/taxa/${t.id}`,
    },
    {
      id: 'gbif', name: 'GBIF Species', home: 'https://www.gbif.org/',
      kw: 'gbif:3 taxonomy:3 species_database:2 taxon:2 biodiversity_data:2',
      sample: 'Panthera leo',
      url: q => `https://api.gbif.org/v1/species/search?q=${enc(K.term(q))}&limit=5`,
      list: 'results',
      title: 'scientificName',
      body: s => `${s.kingdom || ''} · ${s.rank || ''} · ${s.taxonomicStatus || ''}`,
      link: s => `https://www.gbif.org/species/${s.key}`,
    },
    {
      id: 'gbif-occ', name: 'GBIF Occurrences', home: 'https://www.gbif.org/occurrence/search',
      kw: 'occurrence:3 occurrences:3 sightings:3 sighting:3 where_found:3 distribution:2 habitat:2',
      sample: 'Panthera leo sightings',
      url: q => `https://api.gbif.org/v1/occurrence/search?scientificName=${enc(K.term(q))}&limit=5`,
      list: 'results',
      title: r => `${r.scientificName || 'record'} · ${r.country || 'unknown country'}`,
      body: r => `${r.eventDate ? r.eventDate.slice(0, 10) : 'no date'} · ${r.basisOfRecord || ''}`,
      link: r => `https://www.gbif.org/occurrence/${r.key}`,
    },
    {
      id: 'dogceo', name: 'Dog CEO', home: 'https://dog.ceo/dog-api/',
      kw: 'dog:3 dogs:3 puppy:3 puppies:3 doggo:3 canine:2 pup:2',
      sample: 'random dog',
      url: () => 'https://dog.ceo/api/breeds/image/random',
      list: d => [{ message: d.message }],
      title: () => 'Random dog photo',
      body: d => d.message,
      link: d => d.message,
    },
    {
      id: 'catfact', name: 'Cat facts (catfact.ninja)', home: 'https://catfact.ninja/',
      kw: 'cat:3 cats:3 kitten:3 kittens:3 feline:3 meow:2',
      sample: 'cat facts',
      url: () => 'https://catfact.ninja/facts?limit=5',
      list: 'data',
      title: 'fact',
      body: () => 'Cat fact',
      link: 'https://catfact.ninja/',
    },
  ], {
    kw: 'animal:2 animals:2 pet:2 pets:2 zoo:1',
  });
})(Keyless);
