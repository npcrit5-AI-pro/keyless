(function (K) {
  'use strict';
  const enc = K.enc;

  K.category('health', 'Health & medicine', [
    {
      id: 'openfda-drug', name: 'openFDA Drug Labels', home: 'https://open.fda.gov/',
      kw: 'drug:3 drugs:3 medication:3 medications:3 medicine:3 pharmaceutical:2 side_effects:3 dosage:3 fda:3 prescription:2',
      sample: 'ibuprofen',
      url: q => `https://api.fda.gov/drug/label.json?search=openfda.generic_name:"${enc(K.term(q))}"&limit=5`,
      list: 'results',
      title: r => (r.openfda?.brand_name || r.openfda?.generic_name || ['(unnamed label)'])[0],
      body: r => (r.purpose || r.indications_and_usage || [''])[0].slice(0, 160),
      link: r => `https://open.fda.gov/apis/drug/label/`,
    },
    {
      id: 'openfda-recall', name: 'openFDA Food Recalls', home: 'https://open.fda.gov/apis/food/enforcement/',
      kw: 'recall:3 recalls:3 food_recall:3 product_recall:3 contamination:2 fda_recall:3',
      sample: 'food recall',
      url: () => 'https://api.fda.gov/food/enforcement.json?limit=5&sort=report_date:desc',
      list: 'results',
      title: r => r.product_description?.slice(0, 90),
      body: r => `${r.classification} · ${r.reason_for_recall?.slice(0, 120) || ''}`,
      link: 'https://open.fda.gov/apis/food/enforcement/',
    },
    {
      id: 'openfda-device', name: 'openFDA Device Events', home: 'https://open.fda.gov/apis/device/event/',
      kw: 'medical_device:3 device_adverse:2 medical_devices:3 device_event:2',
      sample: 'pacemaker',
      url: q => `https://api.fda.gov/device/event.json?search=device.generic_name:"${enc(K.term(q))}"&limit=5`,
      list: 'results',
      title: r => r.device?.[0]?.generic_name || 'device event',
      body: r => `${r.event_type || ''} · ${r.date_received || ''}`,
      link: 'https://open.fda.gov/apis/device/event/',
    },
    {
      id: 'clinicaltrials', name: 'ClinicalTrials.gov', home: 'https://clinicaltrials.gov/',
      kw: 'clinical_trial:3 clinical_trials:3 trial:3 trials:3 clinicaltrials:3 study_participants:2 recruiting:2',
      sample: 'clinical trial diabetes',
      url: q => `https://clinicaltrials.gov/api/v2/studies?query.cond=${enc(K.term(q))}&pageSize=5`,
      list: 'studies',
      title: s => s.protocolSection.identificationModule.briefTitle,
      body: s => `${s.protocolSection.statusModule?.overallStatus || ''} · ${s.protocolSection.designModule?.phases?.join(', ') || ''}`,
      link: s => `https://clinicaltrials.gov/study/${s.protocolSection.identificationModule.nctId}`,
    },
    {
      id: 'medlineplus', name: 'MedlinePlus Connect', home: 'https://medlineplus.gov/', proxy: true,
      kw: 'medlineplus:3 health_topic:3 symptom:3 symptoms:3 disease:3 diseases:3 condition:2 illness:2',
      sample: 'diabetes',
      run: async q => {
        const text = await K.http(`https://wsearch.nlm.nih.gov/ws/query?db=healthTopics&term=${enc(K.term(q))}&retmax=5`, { text: true, proxy: true });
        const items = [...text.matchAll(/<document[^>]*url="([^"]+)"[\s\S]*?<content name="title">([\s\S]*?)<\/content>/g)].slice(0, 5);
        K.need(items.length, 'No MedlinePlus topics matched.');
        return items.map(([, url, title]) => ({ title: K.clean(title), body: 'MedlinePlus health topic', link: url }));
      },
    },
    {
      id: 'nih-rxnorm', name: 'RxNorm (NLM)', home: 'https://lhncbc.nlm.nih.gov/RxNav/',
      kw: 'rxnorm:3 rxcui:3 drug_name:2 generic_drug:2 brand_name_drug:2',
      sample: 'rxnorm aspirin',
      url: q => `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${enc(K.term(q))}`,
      list: d => (d.drugGroup?.conceptGroup || []).flatMap(g => g.conceptProperties || []).slice(0, 5),
      title: p => p.name,
      body: p => `RxCUI ${p.rxcui} · ${p.tty}`,
      link: 'https://lhncbc.nlm.nih.gov/RxNav/',
    },
    {
      id: 'covid-disease-sh', name: 'disease.sh (COVID-19 stats)', home: 'https://disease.sh/',
      kw: 'covid:3 covid19:3 coronavirus:3 pandemic:3 cases:2 pandemic_stats:2 infection_rate:2',
      sample: 'covid in Germany',
      run: async q => {
        const country = K.term(q).replace(/\b(covid|covid19|coronavirus|cases|pandemic|stats|in)\b/gi, '').trim() || 'world';
        const d = await K.http(`https://disease.sh/v3/covid-19/${country === 'world' ? 'all' : `countries/${enc(country)}`}`);
        return [{
          title: `COVID-19 · ${country === 'world' ? 'World' : K.cap(country)}`,
          body: `${Number(d.cases).toLocaleString()} cases · ${Number(d.deaths).toLocaleString()} deaths · ${Number(d.recovered).toLocaleString()} recovered`,
          link: 'https://disease.sh/',
          facts: [['Cases', Number(d.cases).toLocaleString()], ['Deaths', Number(d.deaths).toLocaleString()]],
        }];
      },
    },
  ], {
    kw: 'health:3 medical:3 wellness:2 hospital:2 doctor:2 symptom:2 vaccine:2 vaccination:2',
  });
  K.register('health', {
    id: 'wger', name: 'wger (exercise database)', home: 'https://wger.de/',
    kw: 'exercise:3 exercises:3 workout:3 workouts:3 fitness:3 gym:2 training:2 muscles:2',
    sample: 'exercises',
    url: () => 'https://wger.de/api/v2/exerciseinfo/?language=2&limit=5',
    list: 'results',
    title: e => e.translations?.[0]?.name || `${e.category?.name || 'Exercise'} exercise`,
    body: e => `Muscles: ${(e.muscles || []).map(m => m.name_en || m.name).join(', ') || 'n/a'}`,
    link: e => `https://wger.de/en/exercise/${e.id}`,
  });
})(Keyless);
