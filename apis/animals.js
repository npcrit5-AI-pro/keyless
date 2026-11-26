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
  K.register('animals', {
    id: 'randomfox', name: 'RandomFox (fox pictures)', home: 'https://randomfox.ca/',
    kw: 'fox:3 foxes:3 fox_pictures:3 random_fox:3 randomfox:3 fox_images:2',
    sample: 'random fox',
    url: () => 'https://randomfox.ca/floof/',
    list: d => [d],
    title: () => 'Random fox picture',
    body: d => d.image,
    link: d => d.link || d.image,
  });
  K.register('animals', {
    id: 'cataas', name: 'Cat as a Service (cat pictures)', home: 'https://cataas.com/',
    kw: 'cat_pictures:3 cat_images:3 cataas:3 random_cat:2 cat_photos:2',
    sample: 'cat pictures',
    url: () => 'https://cataas.com/api/cats?limit=5',
    list: d => d,
    title: c => `Cat picture ${String(c.id).slice(0, 8)}`,
    body: c => (c.tags || []).join(', ') || 'cat picture',
    link: c => `https://cataas.com/cat/${c.id}`,
  });
  K.register('animals', {
    id: 'thecatapi-images', name: 'The Cat API (images)', home: 'https://thecatapi.com/',
    kw: 'thecatapi:3 cat_api:3 random_cat_images:3 cat_image_api:3',
    sample: 'cat api',
    url: () => 'https://api.thecatapi.com/v1/images/search?limit=5',
    list: d => d,
    title: c => `Cat image ${c.id}`,
    body: c => `${c.width}×${c.height}px`,
    link: c => c.url,
  });
  K.register('animals', {
    id: 'dog-breeds', name: 'Dog CEO (breed list)', home: 'https://dog.ceo/dog-api/',
    kw: 'dog_breeds:3 dog_breed_list:3 breeds_of_dogs:3 dog_types:2 breed_list:2',
    sample: 'dog breeds',
    url: () => 'https://dog.ceo/api/breeds/list/all',
    list: d => Object.keys(d.message).map(breed => ({ breed, subs: d.message[breed] })),
    title: x => K.cap(x.breed),
    body: x => (x.subs.length ? `Sub-breeds: ${x.subs.join(', ')}` : 'No sub-breeds'),
    link: () => 'https://dog.ceo/dog-api/documentation/',
  });
})(Keyless);
