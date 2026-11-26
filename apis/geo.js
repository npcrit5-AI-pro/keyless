(function (K) {
  'use strict';
  const enc = K.enc;
  const IP = /\d{1,3}(?:\.\d{1,3}){3}/;

  K.category('geo', 'Geography & places', [
    {
      id: 'nominatim', name: 'OpenStreetMap Nominatim', home: 'https://nominatim.openstreetmap.org/', proxy: true,
      kw: 'geocode:3 coordinates:3 latitude:2 longitude:2 address:3 location:2 place_name:2 osm:3 openstreetmap:3',
      sample: 'coordinates of Lisbon',
      url: q => `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&q=${enc(K.term(q))}`,
      list: d => d,
      title: 'display_name',
      body: x => `${Number(x.lat).toFixed(4)}, ${Number(x.lon).toFixed(4)} · ${x.type}`,
      link: x => `https://www.openstreetmap.org/?mlat=${x.lat}&mlon=${x.lon}#map=12/${x.lat}/${x.lon}`,
    },
    {
      id: 'openmeteo-geo', name: 'Open-Meteo Geocoding', home: 'https://open-meteo.com/en/docs/geocoding-api',
      kw: 'city_coordinates:3 city_info:2 elevation:3 altitude:2 timezone:2 time_zone:2',
      sample: 'Lisbon elevation',
      url: q => `https://geocoding-api.open-meteo.com/v1/search?name=${enc(K.term(q))}&count=5&language=en&format=json`,
      list: 'results',
      title: x => `${x.name}, ${x.country || x.country_code || ''}`.trim(),
      body: x => `${x.latitude.toFixed(3)}, ${x.longitude.toFixed(3)} · elevation ${x.elevation ?? '?'} m · ${x.timezone}`,
      link: x => `https://www.openstreetmap.org/?mlat=${x.latitude}&mlon=${x.longitude}#map=10/${x.latitude}/${x.longitude}`,
    },
    {
      id: 'ipwhois', name: 'ipwho.is', home: 'https://ipwho.is/',
      kw: 'ipwhois:3 ip_lookup:3 ip_location:3 whois_ip:2 geolocate:3',
      sample: 'ip lookup 1.1.1.1',
      run: async q => {
        const d = await K.http(`https://ipwho.is/${(q.match(IP) || [''])[0]}`);
        K.need(d.success, 'IP lookup failed.');
        return [{ title: `${d.ip} · ${d.city}, ${d.country}`, body: `${d.connection?.isp || ''} · ${d.timezone?.id || ''}`, link: 'https://ipwho.is/' }];
      },
    },
    {
      id: 'bigdatacloud', name: 'BigDataCloud Reverse Geocode', home: 'https://www.bigdatacloud.com/',
      kw: 'reverse_geocode:3 lat_long:2 what_country:2 which_country:2',
      sample: 'reverse geocode 38.7,-9.14',
      run: async q => {
        const m = K.need(q.match(/(-?\d+(?:\.\d+)?)\s*[, ]\s*(-?\d+(?:\.\d+)?)/), 'Give coordinates like 38.7, -9.14.');
        const d = await K.http(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${m[1]}&longitude=${m[2]}&localityLanguage=en`);
        return [{ title: `${d.locality || d.city || '—'}, ${d.countryName || ''}`, body: d.principalSubdivision || '', link: 'https://www.bigdatacloud.com/' }];
      },
    },
  ], {
    kw: 'place:2 places:2 geography:3 map:2 maps:2 location:1 coordinates:1',
  });
  K.register('geo', {
    id: 'open-elevation', name: 'Open-Elevation', home: 'https://open-elevation.com/',
    kw: 'elevation:3 altitude:3 height_above_sea_level:3 mountain_height:2 how_high:2',
    sample: 'elevation of Zurich',
    run: async q => {
      const p = await K.geocode(K.term(q));
      const d = await K.http(`https://api.open-elevation.com/api/v1/lookup?locations=${p.latitude},${p.longitude}`);
      return [{
        title: `${p.name} · ${Math.round(d.results[0].elevation)} m`,
        body: `Elevation at ${p.latitude.toFixed(3)}, ${p.longitude.toFixed(3)}`,
        link: 'https://open-elevation.com/',
      }];
    },
  });
  K.register('geo', {
    id: 'flagcdn', name: 'FlagCDN (country codes)', home: 'https://flagcdn.com/',
    kw: 'flag_codes:3 country_codes:3 iso_codes:3 flagcdn:3 country_flags:2',
    sample: 'country codes',
    url: () => 'https://flagcdn.com/en/codes.json',
    list: d => Object.entries(d).slice(0, 5),
    title: ([code, name]) => `${code.toUpperCase()} · ${name}`,
    body: ([code]) => `Flag image: https://flagcdn.com/w80/${code}.png`,
    link: ([code]) => `https://flagcdn.com/${code}.svg`,
  });
  K.register('geo', {
    id: 'zippopotam-us', name: 'Zippopotam (US ZIP codes)', home: 'https://www.zippopotam.us/',
    kw: 'zip_code:3 zipcode:3 us_zip:3 zip_lookup:3 us_postal_code:3 zippopotam:3',
    sample: 'zip 90210',
    url: q => `https://api.zippopotam.us/us/${enc(K.need(q.match(/\d{5}/), 'Give a 5-digit US ZIP code.')[0])}`,
    list: 'places',
    title: p => `${p['place name']}, ${p['state abbreviation']}`,
    body: p => `${p.latitude}, ${p.longitude}`,
    link: () => 'https://www.zippopotam.us/',
  });
  K.register('geo', {
    id: 'geo-gouv-communes', name: 'geo.api.gouv.fr (French communes)', home: 'https://geo.api.gouv.fr/',
    kw: 'french_communes:3 commune_france:3 insee_communes:3 french_municipalities:3 communes_france:3 france_municipalities:2',
    sample: 'Paris',
    url: q => `https://geo.api.gouv.fr/communes?nom=${enc(K.term(q))}&fields=nom,population,codesPostaux&limit=5`,
    list: d => d,
    title: c => c.nom,
    body: c => `Population ${c.population?.toLocaleString?.() ?? 'n/a'} · postcode ${(c.codesPostaux || [])[0] || 'n/a'}`,
    link: () => 'https://geo.api.gouv.fr/',
  });
  K.register('geo', {
    id: 'adresse-gouv', name: 'Base Adresse Nationale (France addresses)', home: 'https://adresse.data.gouv.fr/',
    kw: 'french_address:3 address_france:3 adresse_gouv:3 ban_address:3 address_lookup_france:2',
    sample: '8 bd du port Paris',
    url: q => `https://api-adresse.data.gouv.fr/search/?q=${enc(q.trim())}&limit=5`,
    list: 'features',
    title: f => f.properties.label,
    body: f => f.properties.context || '',
    link: () => 'https://adresse.data.gouv.fr/',
  });
  K.register('geo', {
    id: 'geogratis', name: 'Geogratis (Canadian place names)', home: 'https://geogratis.gc.ca/',
    kw: 'canadian_places:3 canada_places:3 geogratis:3 canadian_geography:2 canada_place_names:3',
    sample: 'ottawa',
    url: q => `https://geogratis.gc.ca/services/geolocation/en/locate?q=${enc(K.term(q))}`,
    list: d => d,
    title: x => x.title,
    body: x => x.qualifier || x.type || '',
    link: () => 'https://geogratis.gc.ca/',
  });
  K.register('geo', {
    id: 'entur-geocoder', name: 'Entur geocoder (Norway places)', home: 'https://entur.no/',
    kw: 'norway_places:3 entur:3 norwegian_places:3 norway_geocoder:3 norway_stops:2',
    sample: 'bergen',
    url: q => `https://api.entur.io/geocoder/v1/autocomplete?text=${enc(K.term(q))}&size=5`,
    list: 'features',
    title: f => f.properties.label,
    body: f => f.properties.county || f.properties.country || '',
    link: () => 'https://entur.no/',
  });
  K.register('geo', {
    id: 'country-is', name: 'country.is (IP to country)', home: 'https://country.is/',
    kw: 'ip_country:3 country_of_ip:3 ip_to_country:3 country_is:3',
    sample: '8.8.8.8',
    url: q => `https://api.country.is/${enc((q.match(/\d{1,3}(?:\.\d{1,3}){3}/) || ['8.8.8.8'])[0])}`,
    list: d => [d],
    title: d => `${d.ip} is in ${d.country}`,
    body: () => 'Country from IP (country.is)',
    link: () => 'https://country.is/',
  });
})(Keyless);
