(function (K) {
  'use strict';

  K.category('disasters', 'Earthquakes & hazards', [
    {
      id: 'usgs', name: 'USGS Earthquakes', home: 'https://earthquake.usgs.gov/',
      kw: 'earthquake:3 earthquakes:3 quake:3 quakes:3 seismic:3 tremor:2 tremors:2',
      sample: 'earthquakes',
      url: () => 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&orderby=time&limit=5',
      list: 'features',
      title: 'properties.title',
      body: f => new Date(f.properties.time).toLocaleString(),
      link: 'properties.url',
    },
    {
      id: 'emsc', name: 'EMSC Seismic Portal', home: 'https://www.seismicportal.eu/',
      kw: 'emsc:3 seismic_portal:3 europe_earthquake:2 earthquake_europe:2',
      sample: 'earthquake Europe',
      url: () => 'https://www.seismicportal.eu/fdsnws/event/1/query?format=json&limit=5&orderby=time',
      list: 'features',
      title: 'properties.flynn_region',
      body: f => `M${f.properties.mag} · ${f.properties.time.slice(0, 16).replace('T', ' ')} UTC`,
      link: 'https://www.seismicportal.eu/',
    },
    {
      id: 'geonet', name: 'GeoNet New Zealand', home: 'https://www.geonet.org.nz/',
      kw: 'geonet:3 new_zealand_quake:3 nz_earthquake:3 new_zealand_earthquake:3',
      sample: 'New Zealand earthquakes',
      url: () => 'https://api.geonet.org.nz/quake?MMI=3',
      list: 'features',
      title: f => f.properties.locality || 'New Zealand earthquake',
      body: f => `M${f.properties.magnitude} · depth ${f.properties.depth} km`,
      link: 'https://www.geonet.org.nz/',
    },
    {
      id: 'eonet', name: 'NASA EONET', home: 'https://eonet.gsfc.nasa.gov/',
      kw: 'eonet:3 natural_events:3 wildfire:3 wildfires:3 hurricane:3 hurricanes:3 cyclone:2 disaster:2 disasters:2 volcano:2',
      sample: 'natural disaster events',
      url: () => 'https://eonet.gsfc.nasa.gov/api/v3/events?limit=5&status=open',
      list: 'events',
      title: 'title',
      body: e => (e.categories || []).map(c => c.title).join(', '),
      link: 'link',
    },
    {
      id: 'openmeteo-flood', name: 'Open-Meteo Flood', home: 'https://open-meteo.com/en/docs/flood-api',
      kw: 'flood:3 floods:3 flooding:3 river_discharge:3 river:2 rivers:2 discharge:2',
      sample: 'floods in Berlin',
      run: async q => {
        const p = await K.geocode(K.term(q));
        const d = (await K.http(`https://flood-api.open-meteo.com/v1/flood?latitude=${p.latitude}&longitude=${p.longitude}&daily=river_discharge`)).daily;
        const vals = d.river_discharge.filter(v => v != null);
        K.need(vals.length, `No river discharge data near ${p.name}.`);
        return [{
          title: `River discharge · ${p.name}`,
          body: `${vals[0]} m³/s today · peak in the next ${vals.length} days ${Math.max(...vals)} m³/s`,
          link: 'https://open-meteo.com/en/docs/flood-api',
        }];
      },
    },
    {
      id: 'usgs-volcano', name: 'USGS Volcano Hazards', home: 'https://volcanoes.usgs.gov/',
      kw: 'volcano:3 volcanoes:3 volcanic:2 eruption:3 eruptions:3 lava:2 alaska_volcano:2',
      sample: 'volcano alert status',
      url: () => 'https://volcanoes.usgs.gov/vsc/api/volcanoApi/vhpstatus',
      list: d => d,
      title: 'vName',
      body: v => `Alert level ${v.alertLevel || 'n/a'} · aviation color ${v.colorCode || 'n/a'}`,
      link: 'vUrl',
    },
    {
      id: 'ukflood', name: 'UK Flood Monitoring', home: 'https://check-for-flooding.service.gov.uk/',
      kw: 'uk_flood:3 flood_warning:3 flood_warnings:3 england_flood:3 environment_agency:3',
      sample: 'UK flood warnings',
      url: () => 'https://environment.data.gov.uk/flood-monitoring/id/floods',
      list: 'items',
      title: 'description',
      body: f => [f.eaAreaName, f.severity].filter(Boolean).join(' · '),
      link: 'https://check-for-flooding.service.gov.uk/',
    },
  ], {
    kw: 'disaster:2 hazard:2 hazards:2 emergency:2',
  });
})(Keyless);
