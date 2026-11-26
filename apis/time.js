(function (K) {
  'use strict';
  const enc = K.enc;
  const CODES = {
    germany: 'DE', france: 'FR', spain: 'ES', italy: 'IT', portugal: 'PT', netherlands: 'NL',
    japan: 'JP', canada: 'CA', australia: 'AU', brazil: 'BR', mexico: 'MX', india: 'IN',
    'united kingdom': 'GB', uk: 'GB', 'united states': 'US', usa: 'US', us: 'US',
  };

  K.category('time', 'Time & calendars', [
    {
      id: 'timeapi-io', name: 'timeapi.io (time zones)', home: 'https://timeapi.io/',
      kw: 'timezone_now:3 timeapi:3 current_timezone:2',
      sample: 'timezone Europe/Berlin',
      run: async q => {
        const zone = (q.match(/[A-Za-z]+\/[A-Za-z_]+/) || ['Europe/Berlin'])[0];
        const d = await K.http(`https://timeapi.io/api/Time/current/zone?timeZone=${enc(zone)}`);
        return [{ title: `${d.timeZone} · ${d.time}`, body: `${d.dayOfWeek}, ${d.date}`, link: 'https://timeapi.io/' }];
      },
    },
    {
      id: 'nager-holidays', name: 'Nager.Date Public Holidays', home: 'https://date.nager.at/',
      kw: 'holiday:3 holidays:3 public_holiday:3 public_holidays:3 bank_holiday:3 festival:2 festivals:2',
      sample: 'holidays in Germany',
      run: async q => {
        const place = K.term(q).toLowerCase();
        const cc = CODES[place] || (place.match(/\b[a-z]{2}\b/) || ['us'])[0].toUpperCase();
        const list = await K.http(`https://date.nager.at/api/v3/PublicHolidays/${new Date().getFullYear()}/${cc}`);
        K.need(list.length, `No holidays found for ${cc}.`);
        return list.slice(0, 5).map(h => ({ title: h.localName, body: `${h.date} · ${h.name}`, link: 'https://date.nager.at/' }));
      },
    },
    {
      id: 'nager-countries', name: 'Nager.Date Country List', home: 'https://date.nager.at/',
      kw: 'country_holidays:2 country_code:2 iso_country:2',
      sample: 'available countries holidays',
      url: () => 'https://date.nager.at/api/v3/AvailableCountries',
      list: d => d.slice(0, 5),
      title: c => c.name,
      body: c => `code ${c.countryCode}`,
      link: 'https://date.nager.at/',
    },
  ], {
    kw: 'calendar:2 date:2 today:1 schedule:1 time:3 clock:2 timezone:3 time_zone:3 current_time:3 local_time:3 utc:2',
  });
  K.register('time', {
    id: 'hebcal', name: 'Hebcal (Hebrew calendar)', home: 'https://www.hebcal.com/',
    kw: 'hebrew_date:3 jewish_calendar:3 hebcal:3 jewish_holidays:3 shabbat:3 hanukkah:2 passover:2 hebrew_calendar:3',
    sample: 'Hebrew date today',
    url: () => `https://www.hebcal.com/converter?cfg=json&date=${new Date().toISOString().slice(0, 10)}&g2h=1`,
    list: d => [d],
    title: d => `${d.hd} ${d.hm} ${d.hy}`,
    body: () => 'Hebrew calendar date for today',
    link: () => 'https://www.hebcal.com/',
  });
  K.register('time', {
    id: 'aladhan', name: 'Aladhan (prayer times)', home: 'https://aladhan.com/prayer-times-api',
    kw: 'prayer_times:3 salah:3 namaz:3 adhan:3 islamic_prayer:3 iftar:2',
    sample: 'prayer times London',
    run: async q => {
      const p = await K.geocode(K.term(q).replace(/\b(prayer|times?)\b/gi, '').trim());
      const d = await K.http(`https://api.aladhan.com/v1/timings?latitude=${p.latitude}&longitude=${p.longitude}&method=2`);
      const t = d.data.timings;
      return ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map(n => ({
        title: `${n} · ${t[n]} local time`,
        body: `${p.name} prayer times (Muslim World League)`,
        link: 'https://aladhan.com/prayer-times-api',
        facts: [['Time', t[n]]],
      }));
    },
  });
  K.register('time', {
    id: 'kayaposoft-holidays', name: 'Kayaposoft (public holidays)', home: 'https://kayaposoft.com/enrico/',
    kw: 'public_holidays:3 holidays_usa:3 national_holidays:3 kayaposoft:3 holiday_list:2',
    sample: 'usa holidays',
    url: () => 'https://kayaposoft.com/enrico/json/v2.0/?action=getHolidaysForYear&year=2026&country=usa&holidayType=public_holiday',
    list: d => d,
    title: h => h.name?.[0]?.text,
    body: h => `${h.date.year}-${String(h.date.month).padStart(2, '0')}-${String(h.date.day).padStart(2, '0')}`,
    link: () => 'https://kayaposoft.com/enrico/',
  });
  K.register('time', {
    id: 'openholidays', name: 'OpenHolidays (country holidays)', home: 'https://www.openholidaysapi.org/',
    kw: 'school_holidays:3 public_holidays_europe:3 openholidays:3 holiday_calendar:2',
    sample: 'countries',
    url: () => 'https://openholidaysapi.org/Countries',
    list: d => d,
    title: c => c.name?.[0]?.text,
    body: c => `ISO ${c.isoCode} · official languages ${(c.officialLanguages || []).join(', ')}`,
    link: () => 'https://www.openholidaysapi.org/',
  });
})(Keyless);
