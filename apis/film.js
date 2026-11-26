(function (K) {
  'use strict';
  const enc = K.enc;

  K.category('film', 'Movies & TV', [
    {
      id: 'tvmaze', name: 'TVmaze', home: 'https://www.tvmaze.com/api',
      kw: 'tv:3 show:3 shows:3 series:3 episode:3 episodes:3 tvshow:3 sitcom:2 season:2 seasons:2 netflix:1 television:2',
      sample: 'Breaking Bad',
      url: q => `https://api.tvmaze.com/search/shows?q=${enc(K.term(q))}`,
      list: d => d.map(x => x.show).slice(0, 5),
      title: s => `${s.name}${s.premiered ? ` (${s.premiered.slice(0, 4)})` : ''}`,
      body: s => `${s.status || ''} · ${(s.genres || []).slice(0, 3).join(', ')} · rating ${s.rating?.average ?? 'n/a'}`,
      link: 'url',
    },
    {
      id: 'tvmaze-schedule', name: 'TVmaze Schedule', home: 'https://www.tvmaze.com/api#schedule',
      kw: 'tv_schedule:3 whats_on:3 tonight_tv:3 tv_tonight:3 airing:2 airs:2',
      sample: 'tv schedule today',
      url: () => 'https://api.tvmaze.com/schedule?country=US',
      list: d => d.slice(0, 5),
      title: e => `${e.show.name} · S${e.season}E${e.number}`,
      body: e => `${e.airtime || ''} · ${e.name || ''}`,
      link: e => e.show.url,
    },
    {
      id: 'imdb-suggest', name: 'IMDb Suggestions', home: 'https://www.imdb.com/', proxy: true,
      kw: 'imdb:3 imdb_suggest:3 film_title:2',
      sample: 'imdb inception',
      url: q => `https://v3.sg.media-imdb.com/suggestion/x/${enc(K.term(q).toLowerCase())}.json`,
      list: 'd',
      title: t => `${t.l} (${t.y || '?'})`,
      body: t => t.s || '',
      link: t => `https://www.imdb.com/title/${t.id}/`,
    },
    {
      id: 'ghibli', name: 'Studio Ghibli API', home: 'https://ghibliapi.vercel.app/',
      kw: 'ghibli:3 miyazaki:3 studio_ghibli_films:3 ghibli_film:3',
      sample: 'Studio Ghibli films',
      url: () => 'https://ghibliapi.vercel.app/films',
      list: d => d.slice(0, 5),
      title: f => `${f.title} (${f.release_date})`,
      body: f => `${f.director} · ${f.running_time} min · RT ${f.rt_score}`,
      link: f => `https://ghibliapi.vercel.app/films/${f.id}`,
    },
  ], {
    kw: 'movie:3 movies:3 film:3 films:3 cinema:2 watch:1',
  });
  K.register('film', {
    id: 'kitsu-anime', name: 'Kitsu (anime search)', home: 'https://kitsu.app/',
    kw: 'anime:3 kitsu:3 anime_shows:3 anime_series:3 japanese_animation:2',
    sample: 'naruto',
    url: q => `https://kitsu.io/api/edge/anime?filter%5Btext%5D=${enc(K.term(q))}&page%5Blimit%5D=5`,
    request: () => ({ headers: { accept: 'application/vnd.api+json' } }),
    list: 'data',
    title: a => a.attributes?.canonicalTitle,
    body: a => `${a.attributes?.status || ''} · rating ${a.attributes?.averageRating || 'n/a'}`,
    link: a => `https://kitsu.app/anime/${a.attributes?.slug}`,
  });
  K.register('film', {
    id: 'swapi', name: 'Star Wars API (characters)', home: 'https://swapi.dev/',
    kw: 'star_wars:3 starwars:3 swapi:3 jedi:2 sith:2 star_wars_characters:3',
    sample: 'luke skywalker',
    url: q => `https://swapi.dev/api/people/?search=${enc(K.term(q))}`,
    list: 'results',
    title: p => p.name,
    body: p => `Born ${p.birth_year} · ${p.gender}`,
    link: p => p.url,
  });
  K.register('film', {
    id: 'shikimori', name: 'Shikimori (anime database)', home: 'https://shikimori.one/',
    kw: 'shikimori:3 anime_database:3 anime_ratings:3 anime_titles:2',
    sample: 'naruto',
    url: q => `https://shikimori.one/api/animes?search=${enc(K.term(q))}&limit=5`,
    list: d => d,
    title: a => a.russian || a.name,
    body: a => `${a.kind || ''} · score ${a.score ?? 'n/a'} · ${a.status || ''}`,
    link: a => `https://shikimori.one${a.url}`,
  });
})(Keyless);
