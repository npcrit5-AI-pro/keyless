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
})(Keyless);
