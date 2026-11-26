(function (K) {
  'use strict';
  const enc = K.enc;

  K.category('travel', 'Travel & transport', [
    {
      id: 'swiss-transport', name: 'Swiss public transport (opendata.ch)', home: 'https://transport.opendata.ch/',
      kw: 'train:3 trains:3 swiss_train:3 switzerland_transport:2 swiss_rail:3 sbb:3 railway:2 railway_station:3 transit:2 transport:2',
      sample: 'train station Zurich',
      url: q => `https://transport.opendata.ch/v1/locations?query=${enc(K.term(q))}`,
      list: 'stations',
      title: s => s.name,
      body: s => `Station ID ${s.id}`,
      link: 'https://transport.opendata.ch/',
    },
  ], {
    kw: 'travel:3 trip:2 vacation:2 journey:2 commute:2 holiday_trip:1',
  });
  K.register('travel', {
    id: 'tfl', name: 'Transport for London (tube status)', home: 'https://tfl.gov.uk/',
    kw: 'tfl:3 london_underground:3 tube:3 london_tube:3 tube_status:3 london_transport:3 underground:2',
    sample: 'tube status',
    url: () => 'https://api.tfl.gov.uk/Line/Mode/tube/Status',
    list: d => d.slice(0, 5),
    title: l => `${l.name} line`,
    body: l => l.lineStatuses?.[0]?.statusSeverityDescription || '',
    link: l => `https://tfl.gov.uk/tube-dlr-overground/status/${l.id}`,
  });
  K.register('travel', {
    id: 'wikivoyage', name: 'Wikivoyage (travel guides)', home: 'https://en.wikivoyage.org/',
    kw: 'travel_guide:3 wikivoyage:3 destination_guide:3 city_guide:3 travel_tips:3 trip_planning:2',
    sample: 'Paris',
    url: q => `https://en.wikivoyage.org/api/rest_v1/page/summary/${enc(K.cap(K.term(q)).replace(/ /g, '_'))}`,
    list: d => [d],
    title: d => d.title,
    body: d => (d.extract || '').slice(0, 180),
    link: d => d.content_urls?.desktop?.page,
  });
  K.register('travel', {
    id: 'nhtsa-makes', name: 'NHTSA vehicle makes', home: 'https://vpic.nhtsa.dot.gov/',
    kw: 'car_makes:3 vehicle_makes:3 car_brands:3 nhtsa:3 vehicle_manufacturers:2',
    sample: 'car makes',
    url: () => 'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json',
    list: 'Results',
    title: m => m.MakeName,
    body: m => `Make ID ${m.MakeId}`,
    link: () => 'https://vpic.nhtsa.dot.gov/',
  });
})(Keyless);
