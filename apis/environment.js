(function (K) {
  'use strict';
  const enc = K.enc;

  K.category('environment', 'Environment & climate data', [
    {
      id: 'carbon-intensity', name: 'UK Carbon Intensity', home: 'https://carbonintensity.org.uk/',
      kw: 'carbon:3 carbon_intensity:3 grid_carbon:3 emissions:2 co2:2 renewable:2 renewables:2 electricity_mix:2 green_energy:2',
      sample: 'carbon intensity UK',
      url: () => 'https://api.carbonintensity.org.uk/intensity',
      list: 'data',
      title: () => 'UK grid carbon intensity',
      body: d => `${d.intensity.actual ?? d.intensity.forecast} gCO2/kWh · ${d.intensity.index}`,
      link: 'https://carbonintensity.org.uk/',
    },
    {
      id: 'carbon-intensity-generation', name: 'UK Generation Mix', home: 'https://carbonintensity.org.uk/',
      kw: 'generation_mix:3 power_mix:3 energy_mix:2 uk_energy:2 wind_power:2 solar_power:2',
      sample: 'UK generation mix',
      url: () => 'https://api.carbonintensity.org.uk/generation',
      list: d => [d.data],
      title: () => 'UK generation mix now',
      body: d => d.generationmix.slice(0, 4).map(g => `${g.fuel} ${g.perc}%`).join(' · '),
      link: 'https://carbonintensity.org.uk/',
    },
    {
      id: 'energy-charts', name: 'Energy-Charts (Fraunhofer ISE)', home: 'https://www.energy-charts.info/', proxy: true,
      kw: 'energy_charts:3 fraunhofer:2 power_generation:2',
      sample: 'German power generation',
      url: () => 'https://api.energy-charts.info/public_power?country=de',
      list: d => (d.production_types || []).slice(0, 5),
      title: p => p.name,
      body: p => `latest ${Math.round(p.data[p.data.length - 1] ?? 0)} MW`,
      link: 'https://www.energy-charts.info/',
    },
  ], {
    kw: 'environment:3 environmental:3 climate_change:2 sustainability:2 sustainable:2 pollution:2 ecology:2',
  });
  K.register('environment', {
    id: 'noaa-tides', name: 'NOAA CO-OPS tide levels (San Francisco)', home: 'https://tidesandcurrents.noaa.gov/',
    kw: 'tide:3 tides:3 tide_times:3 water_level:3 tidal:3 noaa_tides:3 sea_level:2',
    sample: 'tides',
    run: async () => {
      const d = await K.http('https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=water_level&application=keyless&date=latest&datum=MLLW&station=9414290&time_zone=gmt&units=metric&format=json');
      K.need(d.data && d.data.length, 'No tide data.');
      return d.data.slice(-5).map(x => ({ title: `${x.t} UTC`, body: `Water level ${x.v} m`, link: 'https://tidesandcurrents.noaa.gov/' }));
    },
  });
  K.register('environment', {
    id: 'usgs-water', name: 'USGS water levels (river discharge)', home: 'https://waterdata.usgs.gov/',
    kw: 'river_flow:3 river_discharge:3 streamflow:3 stream_flow:3 usgs_water:3 water_levels:2 river_gauges:2',
    sample: 'river flow',
    url: () => 'https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01646500&parameterCd=00060&period=P1D',
    list: d => d.value?.timeSeries || [],
    title: ts => `${ts.sourceInfo.siteName} · discharge`,
    body: ts => {
      const v = ts.values?.[0]?.value || [];
      const last = v[v.length - 1];
      return last ? `${last.value} ${ts.variable?.unit?.unitCode || 'cfs'} at ${last.dateTime.slice(11, 16)}` : 'no recent reading';
    },
    link: () => 'https://waterdata.usgs.gov/',
  });
  K.register('environment', {
    id: 'octopus-energy', name: 'Octopus Energy (UK tariffs)', home: 'https://octopus.energy/',
    kw: 'energy_tariffs:3 octopus_energy:3 electricity_tariffs:3 uk_energy_tariffs:3 energy_products:2 octopus:3',
    sample: 'energy tariffs',
    url: () => 'https://api.octopus.energy/v1/products/',
    list: 'results',
    title: p => p.display_name || p.full_name,
    body: p => `${p.direction || ''} · ${p.brand || ''}`,
    link: p => p.links?.[0]?.href || 'https://octopus.energy/',
  });
})(Keyless);
