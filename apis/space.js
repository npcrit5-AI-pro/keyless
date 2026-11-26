(function (K) {
  'use strict';
  const enc = K.enc;

  K.category('space', 'Space & astronomy', [
    {
      id: 'launchlibrary', name: 'Launch Library 2', home: 'https://thespacedevs.com/',
      kw: 'launch:3 launches:3 rocket:3 rockets:3 spaceflight:2 space_launch:3 upcoming_launch:3 spacecraft:2',
      sample: 'upcoming rocket launches',
      url: () => 'https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=5',
      list: 'results',
      title: 'name',
      body: x => `${(x.net || '').slice(0, 10)} · ${x.launch_service_provider?.name || ''}`,
      link: 'url',
    },
    {
      id: 'spaceflightnews', name: 'Spaceflight News API', home: 'https://spaceflightnewsapi.net/',
      kw: 'spaceflight:3 space_news:3 space_articles:3 spacenews:3 space:2',
      sample: 'space news',
      url: () => 'https://api.spaceflightnewsapi.net/v4/articles/?limit=5&ordering=-published_at',
      list: 'results',
      title: 'title',
      body: x => `${x.news_site} · ${(x.published_at || '').slice(0, 10)}`,
      link: 'url',
    },
    {
      id: 'whereiss', name: 'Where the ISS at?', home: 'https://wheretheiss.at/',
      kw: 'iss:3 international_space_station:3 space_station:3 station:1 satellite_position:2',
      sample: 'where is the ISS',
      url: () => 'https://api.wheretheiss.at/v1/satellites/25544',
      list: d => [d],
      title: () => 'International Space Station',
      body: x => `${x.latitude.toFixed(2)}°, ${x.longitude.toFixed(2)}° · ${Math.round(x.altitude)} km up`,
      facts: x => [['Latitude', x.latitude.toFixed(2)], ['Longitude', x.longitude.toFixed(2)], ['Altitude', `${Math.round(x.altitude)} km`], ['Speed', `${Math.round(x.velocity)} km/h`]],
      link: 'https://wheretheiss.at/',
    },
    {
      id: 'celestrak', name: 'CelesTrak Orbital Elements', home: 'https://celestrak.org/',
      kw: 'tle:3 norad:3 orbital_elements:3 keplerian:2 satellite_orbit:2 celestrak:3',
      sample: 'TLE ISS',
      url: () => 'https://celestrak.org/NORAD/elements/gp.php?NAME=ISS%20(ZARYA)&FORMAT=json',
      list: d => d,
      title: 'OBJECT_NAME',
      body: x => `Epoch ${(x.EPOCH || '').slice(0, 16)} · inclination ${x.INCLINATION}°`,
      link: 'https://celestrak.org/',
    },
    {
      id: 'swpc', name: 'NOAA Space Weather Scales', home: 'https://www.swpc.noaa.gov/',
      kw: 'space_weather:3 aurora:3 northern_lights:3 solar_flare:3 geomagnetic:3 sunspot:2 sunspots:2 solar_storm:3',
      sample: 'space weather',
      url: () => 'https://services.swpc.noaa.gov/products/noaa-scales.json',
      list: d => Object.values(d),
      title: x => `Space weather ${x.DateStamp}`,
      body: x => `Radio ${x.R?.Scale ?? '–'} · Radiation ${x.S?.Scale ?? '–'} · Geomagnetic ${x.G?.Scale ?? '–'} (${x.G?.Text || ''})`,
      link: 'https://www.swpc.noaa.gov/',
    },
    {
      id: 'nasaimages', name: 'NASA Image and Video Library', home: 'https://images.nasa.gov/',
      kw: 'nasa:3 nasa_images:3 nasa_photos:3 apollo:2 hubble:2 mars_photo:2 astronaut_photo:2',
      sample: 'nasa apollo',
      url: q => `https://images-api.nasa.gov/search?q=${enc(K.term(q))}&media_type=image&page_size=5`,
      list: 'collection.items',
      title: x => x.data?.[0]?.title,
      body: x => `${(x.data?.[0]?.date_created || '').slice(0, 4)} · ${(x.data?.[0]?.description || '').slice(0, 140)}`,
      link: x => `https://images.nasa.gov/details/${x.data?.[0]?.nasa_id}`,
    },
    {
      id: 'sunrise', name: 'Sunrise Sunset', home: 'https://sunrisesunset.io/',
      kw: 'sunrise:3 sunset:3 daylight:2 dawn:2 dusk:2 golden_hour:2 day_length:2',
      sample: 'sunrise in Lisbon',
      run: async q => {
        const p = await K.geocode(K.term(q));
        const r = (await K.http(`https://api.sunrisesunset.io/json?lat=${p.latitude}&lng=${p.longitude}`)).results;
        return [{
          title: `Sun times · ${p.name}`,
          body: `sunrise ${r.sunrise} · sunset ${r.sunset} · day length ${r.day_length}`,
          link: 'https://sunrisesunset.io/',
          facts: [['Sunrise', r.sunrise], ['Sunset', r.sunset], ['Day length', r.day_length]],
        }];
      },
    },
    {
      id: 'jpl-sbdb', name: 'NASA JPL Small-Body Database', home: 'https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html', proxy: true,
      kw: 'asteroid:3 asteroids:3 comet:3 comets:3 small_body:3 minor_planet:3',
      sample: 'asteroid Apophis',
      url: q => `https://ssd-api.jpl.nasa.gov/sbdb.api?sstr=${enc(K.term(q))}`,
      list: d => (d.object ? [d.object] : []),
      title: 'fullname',
      body: x => `${x.kind === 'an' ? 'asteroid' : x.kind} · ${x.orbit_class?.name || ''}`,
      link: 'https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html',
    },
    {
      id: 'jpl-cad', name: 'NASA JPL Close Approaches', home: 'https://cneos.jpl.nasa.gov/ca/', proxy: true,
      kw: 'flyby:3 close_approach:3 near_earth:3 near_earth_object:3 neo:3 asteroid_flyby:3',
      sample: 'asteroid flyby',
      run: async () => {
        const d = await K.http('https://ssd-api.jpl.nasa.gov/cad.api?dist-max=0.05&date-min=now&limit=5', { proxy: true });
        const i = n => d.fields.indexOf(n);
        return (d.data || []).slice(0, 5).map(r => ({
          title: `Asteroid ${r[i('des')]} close approach`,
          body: `${r[i('cd')]} · ${Number(r[i('dist')]).toFixed(4)} au`,
          link: 'https://cneos.jpl.nasa.gov/ca/',
        }));
      },
    },
    {
      id: 'exoplanets', name: 'NASA Exoplanet Archive', home: 'https://exoplanetarchive.ipac.caltech.edu/', proxy: true,
      kw: 'exoplanet:3 exoplanets:3 extrasolar:3 kepler:2 tess:2 planet_discovery:2',
      sample: 'exoplanets',
      url: () => `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=${enc('select top 5 pl_name,hostname,disc_year from ps where default_flag=1 order by disc_year desc')}&format=json`,
      list: d => d,
      title: 'pl_name',
      body: x => `Host ${x.hostname} · discovered ${x.disc_year}`,
      link: 'https://exoplanetarchive.ipac.caltech.edu/',
    },
  ], {
    kw: 'space:2 astronomy:3 cosmos:2 universe:2 planet:1 planets:1 mars:1 moon:1',
  });
})(Keyless);
