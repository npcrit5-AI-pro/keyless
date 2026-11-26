(function (K) {
  'use strict';
  const enc = K.enc;

  K.category('fun', 'Fun & trivia', [
    {
      id: 'jokes', name: 'JokeAPI', home: 'https://sv443.net/jokeapi/v2/', general: true,
      kw: 'joke:3 jokes:3 funny:3 humor:2 humour:2 pun:3 puns:3 laugh:2 lol:2',
      sample: 'programming joke',
      url: () => 'https://v2.jokeapi.dev/joke/Any?amount=3&safe-mode',
      list: d => (d.jokes || [d]),
      title: j => j.type === 'twopart' ? j.setup : (j.joke || 'Joke'),
      body: j => j.type === 'twopart' ? j.delivery : '',
      link: 'https://sv443.net/jokeapi/v2/',
    },
    {
      id: 'chucknorris', name: 'Chuck Norris Jokes', home: 'https://api.chucknorris.io/',
      kw: 'chuck_norris:3 chucknorris:3 norris:3',
      sample: 'chuck norris joke',
      url: () => 'https://api.chucknorris.io/jokes/random',
      list: d => [d],
      title: j => j.value,
      body: () => 'Chuck Norris fact',
      link: j => j.url,
    },
    {
      id: 'uselessfacts', name: 'Useless Facts', home: 'https://uselessfacts.jsph.pl/',
      kw: 'fact:3 facts:3 trivia:3 random_fact:3 fun_fact:3 did_you_know:2 curiosity:1',
      sample: 'random fact',
      url: () => 'https://uselessfacts.jsph.pl/api/v2/facts/random',
      list: d => [d],
      title: f => f.text,
      body: () => 'Random fact',
      link: f => f.source_url || 'https://uselessfacts.jsph.pl/',
    },
    {
      id: 'advice', name: 'Advice Slip', home: 'https://api.adviceslip.com/',
      kw: 'advice:3 advise:2 tip:2 tips:2 suggestion:2 suggestions:2 wisdom:2',
      sample: 'give me advice',
      url: () => 'https://api.adviceslip.com/advice',
      list: d => [d.slip],
      title: s => `Advice #${s.id}`,
      body: s => s.advice,
      link: 'https://api.adviceslip.com/',
    },
    {
      id: 'trivia-opentdb', name: 'Open Trivia DB', home: 'https://opentdb.com/',
      kw: 'trivia_quiz:3 quiz:3 quizzes:3 quiz_question:3 trivia_question:3 opentdb:3 question_quiz:2',
      sample: 'trivia quiz',
      url: () => 'https://opentdb.com/api.php?amount=3&type=multiple',
      list: 'results',
      title: t => t.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, '&'),
      body: t => `${t.category} · ${t.difficulty} · answer: ${t.correct_answer}`,
      link: 'https://opentdb.com/',
    },
    {
      id: 'zenquotes', name: 'ZenQuotes', home: 'https://zenquotes.io/', proxy: true,
      kw: 'zen_quote:3 zen:2 stoic_quote:2 motivational_quote:3 motivation:2',
      sample: 'motivational quote',
      url: () => 'https://zenquotes.io/api/random',
      list: d => d.slice(0, 1),
      title: q => q.q,
      body: q => `— ${q.a}`,
      link: 'https://zenquotes.io/',
    },
    {
      id: 'bored', name: 'Bored API (activities)', home: 'https://www.boredapi.com/', proxy: true,
      kw: 'bored:3 activity:3 activities:3 something_to_do:3 bored_api:3 idea_to_do:2',
      sample: 'something to do',
      url: () => 'https://bored.api.lewagon.com/api/activity/',
      list: d => [d],
      title: a => a.activity,
      body: a => `${a.type} · ${a.participants} participant(s) · price ${a.price}`,
      link: 'https://www.boredapi.com/',
    },
  ], {
    kw: 'fun:3 entertainment:2 random:1',
  });
  K.register('fun', {
    id: 'agify', name: 'Agify (age guess from a name)', home: 'https://agify.io/',
    kw: 'agify:3 guess_age:3 predict_age:3 age_prediction:3 age:2',
    sample: 'Michael',
    url: q => `https://api.agify.io/?name=${enc(K.term(q))}`,
    list: d => [d],
    title: d => K.cap(d.name),
    body: d => `Predicted age ${d.age ?? 'unknown'} (from ${Number(d.count).toLocaleString()} records)`,
    link: () => 'https://agify.io/',
  });
  K.register('fun', {
    id: 'genderize', name: 'Genderize (gender guess from a name)', home: 'https://genderize.io/',
    kw: 'genderize:3 gender_guess:3 guess_gender:3 gender_from_name:3',
    sample: 'Peter',
    url: q => `https://api.genderize.io/?name=${enc(K.term(q))}`,
    list: d => [d],
    title: d => K.cap(d.name),
    body: d => d.gender ? `${d.gender} (${Math.round(d.probability * 100)}% confidence)` : 'No guess',
    link: () => 'https://genderize.io/',
  });
  K.register('fun', {
    id: 'nationalize', name: 'Nationalize (nationality guess)', home: 'https://nationalize.io/',
    kw: 'nationalize:3 nationality:3 where_from_name:2 nationality_guess:3',
    sample: 'John',
    url: q => `https://api.nationalize.io/?name=${enc(K.term(q))}`,
    list: 'country',
    title: c => `Likely country: ${c.country_id}`,
    body: c => `${(c.probability * 100).toFixed(1)}% probability`,
    link: () => 'https://nationalize.io/',
  });
  K.register('fun', {
    id: 'simpsons', name: 'The Simpsons API', home: 'https://thesimpsonsapi.com/',
    kw: 'simpsons:3 simpson:3 springfield:3 homer:2 bart:2',
    sample: 'simpsons characters',
    url: () => 'https://thesimpsonsapi.com/api/characters',
    list: 'results',
    title: 'name',
    body: c => c.occupation || '',
    link: () => 'https://thesimpsonsapi.com/',
  });
  K.register('fun', {
    id: 'typefit-quotes', name: 'Type.fit quotes', home: 'https://type.fit/', proxy: true,
    kw: 'famous_quotes:2 quote_of_day:3 wise_quote:2',
    sample: 'famous quotes',
    url: () => 'https://type.fit/api/quotes',
    list: d => d.slice(0, 5),
    title: q => q.text,
    body: q => `— ${q.author || 'unknown'}`,
    link: () => 'https://type.fit/',
  });
  K.register('fun', {
    id: 'trivia-v2', name: 'The Trivia API', home: 'https://the-trivia-api.com/',
    kw: 'trivia_questions:3 quiz_questions:3 trivia_api:3 the_trivia_api:3 pub_quiz:2',
    sample: 'trivia questions',
    url: () => 'https://the-trivia-api.com/v2/questions?limit=5',
    list: d => d,
    title: q => (typeof q.question === 'string' ? q.question : q.question?.text),
    body: q => `${q.category} · answer: ${q.correctAnswer}`,
    link: () => 'https://the-trivia-api.com/',
  });
  K.register('fun', {
    id: 'potter-api', name: 'Potter API (Harry Potter characters)', home: 'https://potterapi-fedeperin.vercel.app/',
    kw: 'harry_potter:3 hogwarts:3 potter_characters:3 wizard_characters:2 hogwarts_house:2',
    sample: 'Hogwarts characters',
    url: () => 'https://potterapi-fedeperin.vercel.app/en/characters',
    list: d => d.slice(0, 5),
    title: c => c.fullName,
    body: c => (c.hogwartsHouse ? `${c.hogwartsHouse} · played by ${c.interpretedBy || '—'}` : ''),
    link: () => 'https://potterapi-fedeperin.vercel.app/',
  });
  K.register('fun', {
    id: 'ice-and-fire', name: 'An API of Ice and Fire (Game of Thrones)', home: 'https://anapioficeandfire.com/',
    kw: 'westeros:3 game_of_thrones:3 got_character:2 house_stark:2 ice_and_fire:3',
    sample: 'Jon Snow',
    url: q => `https://www.anapioficeandfire.com/api/characters?name=${enc(K.cap(q.replace(/[^\p{L}\p{N} '-]/gu, ' ').trim()))}`,
    list: d => d,
    title: 'name',
    body: c => [c.gender, c.culture].filter(Boolean).join(' · '),
    link: 'url',
  });
  K.register('fun', {
    id: 'hipsum', name: 'Hipsum (placeholder text)', home: 'https://hipsum.co/',
    kw: 'lorem_ipsum:3 placeholder_text:3 filler_text:3 dummy_text:3 hipster_ipsum:3 ipsum:3',
    sample: 'lorem ipsum',
    url: () => 'https://hipsum.co/api/?type=hipster-centric&paras=1',
    list: d => d,
    title: () => 'Placeholder paragraph',
    body: p => p.slice(0, 200),
    link: () => 'https://hipsum.co/',
  });
})(Keyless);
