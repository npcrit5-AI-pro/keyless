(function (K) {
  'use strict';
  const enc = K.enc;
  const place = q => K.geocode(K.term(q));

  K.category('weather', 'Weather & climate', [
    {
      id: 'weather', name: 'Open-Meteo Forecast', home: 'https://open-meteo.com/',
      kw: 'weather:3 forecast:3 forecasts:3 temperature:2 temperatures:2 rain:2 humidity:2 wind:2 snow:2 climate:2 storm:1 sunny:1 hot:1 cold:1',
      sample: 'weather in Lisbon',
      run: async q => {
        const p = await place(q);
        const w = (await K.http(`https://api.open-meteo.com/v1/forecast?latitude=${p.latitude}&longitude=${p.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation&timezone=auto`)).current;
        return [{
          title: `${p.name}${p.country ? ', ' + p.country : ''}`,
          body: `${w.temperature_2m}°C · humidity ${w.relative_humidity_2m}% · wind ${w.wind_speed_10m} km/h · precipitation ${w.precipitation} mm`,
          link: 'https://open-meteo.com/',
          facts: [['Temp', `${w.temperature_2m}°C`], ['Humidity', `${w.relative_humidity_2m}%`], ['Wind', `${w.wind_speed_10m} km/h`], ['Rain', `${w.precipitation} mm`]],
        }];
      },
    },
    {
      id: 'openmeteo-air', name: 'Open-Meteo Air Quality', home: 'https://open-meteo.com/en/docs/air-quality-api',
      kw: 'air_quality:3 pollution:2 pm2_5:3 pm10:3 smog:2 aqi:3 air:1',
      sample: 'air quality in Berlin',
      run: async q => {
        const p = await place(q);
        const c = (await K.http(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${p.latitude}&longitude=${p.longitude}&current=pm10,pm2_5`)).current;
        return [{
          title: `Air quality · ${p.name}`,
          body: `PM2.5 ${c.pm2_5} µg/m³ · PM10 ${c.pm10} µg/m³`,
          link: 'https://open-meteo.com/en/docs/air-quality-api',
          facts: [['PM2.5', `${c.pm2_5} µg/m³`], ['PM10', `${c.pm10} µg/m³`]],
        }];
      },
    },
    {
      id: 'openmeteo-marine', name: 'Open-Meteo Marine', home: 'https://open-meteo.com/en/docs/marine-weather-api',
      kw: 'waves:3 wave:3 surf:3 marine:3 sea_state:2 swell:2 ocean_waves:3',
      sample: 'wave height in Biarritz',
      run: async q => {
        const p = await place(q);
        const c = (await K.http(`https://marine-api.open-meteo.com/v1/marine?latitude=${p.latitude}&longitude=${p.longitude}&current=wave_height,wave_period`)).current;
        return [{
          title: `Waves · ${p.name}`,
          body: c.wave_height == null ? 'No wave data at this point' : `Wave height ${c.wave_height} m · period ${c.wave_period} s`,
          link: 'https://open-meteo.com/en/docs/marine-weather-api',
          facts: [['Wave height', c.wave_height == null ? '—' : `${c.wave_height} m`]],
        }];
      },
    },
    {
      id: 'openmeteo-archive', name: 'Open-Meteo Historical', home: 'https://open-meteo.com/en/docs/historical-weather-api',
      kw: 'historical:3 history_weather:3 past_weather:3 archive_weather:3 yesterday:2 last_year:2',
      sample: 'historical weather in Berlin',
      run: async q => {
        const p = await place(q);
        const d = (await K.http(`https://archive-api.open-meteo.com/v1/archive?latitude=${p.latitude}&longitude=${p.longitude}&start_date=2024-07-01&end_date=2024-07-03&daily=temperature_2m_max,temperature_2m_min`)).daily;
        return d.time.map((t, i) => ({
          title: `${t} · ${p.name}`,
          body: `high ${d.temperature_2m_max[i]}°C · low ${d.temperature_2m_min[i]}°C`,
          link: 'https://open-meteo.com/en/docs/historical-weather-api',
        }));
      },
    },
    {
      id: 'openmeteo-climate', name: 'Open-Meteo Climate Projections', home: 'https://open-meteo.com/en/docs/climate-api',
      kw: 'climate_projection:3 projections:3 future_climate:3 climate_change:2 2030:1 2050:1',
      sample: 'climate projection Berlin',
      run: async q => {
        const p = await place(q);
        const d = (await K.http(`https://climate-api.open-meteo.com/v1/climate?latitude=${p.latitude}&longitude=${p.longitude}&start_date=2030-01-01&end_date=2030-01-03&models=EC_Earth3P_HR&daily=temperature_2m_mean`)).daily;
        return d.time.map((t, i) => ({
          title: `${t} · ${p.name} (projection)`,
          body: `mean ${d.temperature_2m_mean[i]}°C`,
          link: 'https://open-meteo.com/en/docs/climate-api',
        }));
      },
    },
    {
      id: 'metno', name: 'MET Norway Locationforecast', home: 'https://www.met.no/',
      kw: 'met_norway:3 norway_weather:3 yr:2 nordic_weather:2 met:1',
      sample: 'met norway weather Oslo',
      run: async q => {
        const p = await place(q);
        const t = (await K.http(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${p.latitude.toFixed(4)}&lon=${p.longitude.toFixed(4)}`)).properties.timeseries[0].data.instant.details;
        return [{
          title: `${p.name} · MET Norway`,
          body: `${t.air_temperature}°C · wind ${t.wind_speed} m/s · humidity ${t.relative_humidity}%`,
          link: 'https://www.met.no/',
        }];
      },
    },
    {
      id: 'nws', name: 'US National Weather Service', home: 'https://www.weather.gov/',
      kw: 'nws:3 us_forecast:3 national_weather_service:3 noaa_forecast:2',
      sample: 'forecast Chicago',
      run: async q => {
        const p = await place(q);
        const pts = await K.http(`https://api.weather.gov/points/${p.latitude.toFixed(4)},${p.longitude.toFixed(4)}`);
        const f = await K.http(pts.properties.forecast);
        const period = f.properties.periods[0];
        return [{
          title: `${p.name} · ${period.name}`,
          body: `${period.shortForecast}, ${period.temperature}°${period.temperatureUnit}`,
          link: 'https://www.weather.gov/',
          facts: [['Temp', `${period.temperature}°${period.temperatureUnit}`], ['Wind', period.windSpeed]],
        }];
      },
    },
    {
      id: 'nws-alerts', name: 'NWS Active Alerts (California)', home: 'https://www.weather.gov/alerts',
      kw: 'alerts:3 alert:3 warnings:2 warning:2 severe:2 advisory:2',
      sample: 'weather alerts',
      list: 'features',
      url: () => 'https://api.weather.gov/alerts/active?area=CA',
      title: 'properties.event',
      body: 'properties.headline',
      link: 'properties.uri',
    },
    {
      id: 'wttr', name: 'wttr.in', home: 'https://wttr.in/',
      kw: 'wttr:3 weather_report:2 weather_now:2',
      sample: 'weather Madrid',
      run: async q => {
        const city = K.term(q);
        const c = (await K.http(`https://wttr.in/${enc(city)}?format=j1`)).current_condition[0];
        return [{
          title: `${K.cap(city)} · ${c.weatherDesc[0].value}`,
          body: `${c.temp_C}°C (feels like ${c.FeelsLikeC}°C) · humidity ${c.humidity}% · wind ${c.windspeedKmph} km/h`,
          link: `https://wttr.in/${enc(city)}`,
        }];
      },
    },
    {
      id: '7timer', name: '7Timer! Civil Forecast', home: 'https://www.7timer.info/', proxy: true,
      kw: 'forecast_3day:2 civil_forecast:3 7timer:3 three_day:1',
      sample: 'forecast Madrid',
      run: async q => {
        const p = await place(q);
        const d = (await K.http(`https://www.7timer.info/bin/api.pl?lon=${p.longitude}&lat=${p.latitude}&product=civil&output=json`, { proxy: true })).dataseries[0];
        return [{
          title: `${p.name} · 7Timer`,
          body: `${d.weather} · ${d.temp2m}°C at +${d.timepoint}h`,
          link: 'https://www.7timer.info/',
        }];
      },
    },
  ], {
    kw: 'weather:3 forecast:2 climate:2 meteorology:2',
  });
  K.register('weather', {
    id: 'ipma-forecast', name: 'IPMA (Portugal daily forecast)', home: 'https://www.ipma.pt/',
    kw: 'portugal_weather:3 ipma:3 portuguese_forecast:2 portugal_forecast:3',
    sample: 'portugal forecast',
    url: () => 'https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1110600.json',
    list: 'data',
    title: d => `${d.forecastDate}`,
    body: d => `Min ${d.tMin}°C · Max ${d.tMax}°C · rain ${d.precipitaProb}%`,
    link: () => 'https://www.ipma.pt/',
  });
  K.register('weather', {
    id: 'brightsky-dwd', name: 'Bright Sky (DWD, Germany)', home: 'https://brightsky.dev/',
    kw: 'germany_weather:3 german_weather:3 dwd:3 brightsky:3 deutscher_wetterdienst:2',
    sample: 'weather Berlin',
    run: async q => {
      const p = await K.geocode(K.term(q));
      const d = await K.http(`https://api.brightsky.dev/current_weather?lat=${p.latitude}&lon=${p.longitude}`);
      const w = K.need(d.weather, 'No DWD observation nearby.');
      return [{
        title: `${p.name} · ${w.condition || 'current'} · ${w.temperature}°C`,
        body: `Wind ${w.wind_speed_10 ?? 'n/a'} km/h · DWD station data`,
        link: 'https://brightsky.dev/',
        facts: [['Temp', `${w.temperature}°C`], ['Wind', `${w.wind_speed_10 ?? 'n/a'} km/h`]],
      }];
    },
  });
  K.register('weather', {
    id: 'aviation-metar', name: 'Aviation Weather METAR', home: 'https://aviationweather.gov/', proxy: true,
    kw: 'metar:3 taf:2 airport_weather:3 aviation_weather:3 airport_metar:3 flight_weather:2',
    sample: 'metar KJFK',
    url: q => `https://aviationweather.gov/api/data/metar?ids=${enc((K.term(q).match(/[a-z]{4}/) || ['kjfk'])[0].toUpperCase())}&format=json`,
    list: d => d,
    title: m => `${m.icaoId} · ${m.name || 'airport'}`,
    body: m => m.rawOb || 'METAR observation',
    link: () => 'https://aviationweather.gov/',
  });
})(Keyless);
