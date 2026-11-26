(function (K) {
  'use strict';
  const enc = K.enc;

  K.category('government', 'Government & open data', [
    {
      id: 'uk-police', name: 'UK Police Crime Data', home: 'https://data.police.uk/',
      kw: 'crime:3 crimes:3 police:3 crime_rate:3 crime_data:3 uk_crime:3 burglary:2',
      sample: 'crime data',
      url: () => 'https://data.police.uk/api/crimes-street-dates',
      list: d => d.slice(0, 5),
      title: d => `Crime data · ${d.date}`,
      body: () => 'Dates with available street-level crime data',
      link: 'https://data.police.uk/',
    },
    {
      id: 'uk-parliament', name: 'UK Parliament Members', home: 'https://members-api.parliament.uk/',
      kw: 'mp:3 mps:3 parliament:3 member_of_parliament:3 uk_parliament:3 house_of_commons:3 lords:2',
      sample: 'johnson',
      url: q => `https://members-api.parliament.uk/api/Members/Search?Name=${enc(K.term(q))}&take=5`,
      list: 'items',
      title: i => i.value.nameDisplayAs,
      body: i => `${i.value.latestHouseMembership?.membershipFrom || ''} · ${i.value.latestHouseMembership?.house === 1 ? 'Commons' : 'Lords'}`,
      link: i => `https://members.parliament.uk/member/${i.value.id}/`,
    },
    {
      id: 'ukgov-bills', name: 'UK Parliament Bills', home: 'https://bills.parliament.uk/', proxy: true,
      kw: 'bill:3 bills:3 legislation:3 act_of_parliament:3 parliamentary_bill:3 law_proposal:2',
      sample: 'climate',
      url: q => `https://bills-api.parliament.uk/api/v1/Bills?SearchTerm=${enc(K.term(q))}&take=5`,
      list: 'items',
      title: b => b.shortTitle,
      body: b => `${b.currentHouse} · ${b.originatingHouse}`,
      link: b => `https://bills.parliament.uk/bills/${b.billId}`,
    },
    {
      id: 'congress-legislators', name: 'US Congress Legislators', home: 'https://github.com/unitedstates/congress-legislators',
      kw: 'congress:3 us_congress:3 senate:3 house_of_representatives:3 senators:2 congressman:2 congresswoman:2',
      sample: 'US Congress members',
      url: () => 'https://unitedstates.github.io/congress-legislators/legislators-current.json',
      list: d => d.slice(0, 5),
      title: l => `${l.name.first} ${l.name.last}`,
      body: l => `${l.terms.at(-1).type === 'sen' ? 'Senator' : 'Representative'} · ${l.terms.at(-1).state}`,
      link: 'https://github.com/unitedstates/congress-legislators',
    },
    {
      id: 'govuk-search', name: 'GOV.UK Search API', home: 'https://www.gov.uk/api',
      kw: 'gov_uk:3 govuk:3 uk_government:3 uk_gov:3 gov_uk_service:2 uk_service:2',
      sample: 'driving licence',
      url: q => `https://www.gov.uk/api/search.json?q=${enc(K.term(q))}&count=5`,
      list: 'results',
      title: r => r.title,
      body: r => r.description || '',
      link: r => `https://www.gov.uk${r.link}`,
    },
    {
      id: 'ukgov-postcode', name: 'postcodes.io (UK postcodes)', home: 'https://postcodes.io/',
      kw: 'postcode:3 postcodes:3 uk_postcode:3 zipcode_uk:2 postal_code_uk:2',
      sample: 'postcode SW1A 1AA',
      run: async q => {
        const pc = K.need(q.match(/[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}/), 'Give a UK postcode like SW1A 1AA.')[0];
        const d = (await K.http(`https://api.postcodes.io/postcodes/${enc(pc.replace(/\s+/g, ''))}`)).result;
        return [{
          title: d.postcode,
          body: `${d.admin_district || ''} · ${d.region || d.country || ''} · lat ${d.latitude.toFixed(3)}, lon ${d.longitude.toFixed(3)}`,
          link: 'https://postcodes.io/',
        }];
      },
    },
    {
      id: 'eu-open-data', name: 'EU Open Data Portal', home: 'https://data.europa.eu/',
      kw: 'eu_data:3 european_union:3 eu_open_data:3 europe_dataset:2 eu_statistics:3 eurostat:3',
      sample: 'eurostat population',
      url: q => `https://data.europa.eu/api/hub/search/search?q=${enc(K.term(q))}&limit=5`,
      list: 'result.results',
      title: d => d.title?.en || d.title,
      body: d => (d.description?.en || '').replace(/<[^>]*>/g, '').slice(0, 140),
      link: d => `https://data.europa.eu/data/datasets/${d.id}`,
    },
  ], {
    kw: 'government:3 govt:2 public_sector:2 official:1 statistics:2 stats:1',
  });
  K.register('government', {
    id: 'chicago-crimes', name: 'City of Chicago Crime Reports', home: 'https://data.cityofchicago.org/',
    kw: 'crime_reports:3 police_reports:2 violent_crime:2',
    sample: 'chicago crime',
    url: () => 'https://data.cityofchicago.org/resource/ijzp-q8t2.json?%24limit=5&%24order=date%20DESC',
    list: d => d,
    title: c => c.primary_type,
    body: c => `${c.block || ''} · ${(c.date || '').slice(0, 10)}`,
    link: () => 'https://data.cityofchicago.org/',
  });
  K.register('government', {
    id: 'nyc-311', name: 'NYC 311 Service Requests', home: 'https://data.cityofnewyork.us/',
    kw: '311_requests:3 complaints_311:3 service_requests:2',
    sample: 'nyc 311',
    url: () => 'https://data.cityofnewyork.us/resource/erm2-nwe9.json?%24limit=5',
    list: d => d,
    title: r => r.complaint_type,
    body: r => `${r.borough || ''} · ${(r.created_date || '').slice(0, 10)} · ${r.agency_name || ''}`,
    link: () => 'https://portal.311.nyc.gov/',
  });
  K.register('government', {
    id: 'usaspending', name: 'USAspending.gov agencies', home: 'https://www.usaspending.gov/',
    kw: 'usaspending:3 federal_spending:3 government_spending:3 federal_budget:2 us_spending:3',
    sample: 'federal spending',
    url: () => 'https://api.usaspending.gov/api/v2/references/toptier_agencies/',
    list: 'results',
    title: 'agency_name',
    body: a => `Budget authority ${Number(a.budget_authority_amount || 0).toLocaleString()} · ${a.abbreviation || ''}`,
    link: () => 'https://www.usaspending.gov/',
  });
  K.register('government', {
    id: 'data-gov-au', name: 'data.gov.au (CKAN)', home: 'https://data.gov.au/',
    kw: 'data_gov_au:3 ckan_datasets:2 open_data_portal:2',
    sample: 'australia water datasets',
    url: q => `https://data.gov.au/data/api/3/action/package_search?q=${enc(K.term(q))}&rows=5`,
    list: 'result.results',
    title: 'title',
    body: p => p.organization?.title || '',
    link: p => `https://data.gov.au/data/dataset/${p.name}`,
  });
  K.register('government', {
    id: 'open-canada', name: 'Open Government Canada (CKAN)', home: 'https://open.canada.ca/',
    kw: 'open_canada:3 ckan_datasets:2',
    sample: 'canada water datasets',
    url: q => `https://open.canada.ca/data/api/3/action/package_search?q=${enc(K.term(q))}&rows=5`,
    list: 'result.results',
    title: 'title',
    body: p => p.organization?.title || '',
    link: p => `https://open.canada.ca/data/en/dataset/${p.id}`,
  });
  K.register('government', {
    id: 'eurostat', name: 'Eurostat inflation (Germany, HICP)', home: 'https://ec.europa.eu/eurostat',
    kw: 'eurostat:3 eu_inflation:3 euro_inflation:3 hicp:3 eu_statistics:2',
    sample: 'eurostat',
    run: async () => {
      const d = await K.http('https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/prc_hicp_manr?geo=DE&format=JSON&lang=EN');
      const rows = Object.entries(d.dimension.time.category.label)
        .map(([, name], i) => ({ name, v: d.value?.[i] }))
        .filter(r => r.v != null)
        .slice(-5)
        .reverse();
      K.need(rows.length, 'No inflation data returned.');
      return rows.map(r => ({ title: `Germany inflation · ${r.name}`, body: `${r.v}% year on year (HICP)`, link: 'https://ec.europa.eu/eurostat' }));
    },
  });
})(Keyless);
