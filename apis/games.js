(function (K) {
  'use strict';
  const enc = K.enc;

  K.category('games', 'Video games & board games', [
    {
      id: 'cheapshark', name: 'CheapShark Deals', home: 'https://apidocs.cheapshark.com/',
      kw: 'game_deals:3 game_price:3 steam_deals:3 cheap_games:3 cheapshark:3 discount_games:2 video_game_price:2',
      sample: 'game deals',
      url: () => 'https://www.cheapshark.com/api/1.0/deals?pageSize=5&sortBy=Deal%20Rating',
      list: d => d,
      title: 'title',
      body: d => `$${d.salePrice} (was $${d.normalPrice}) · ${Math.round(d.savings)}% off`,
      link: d => `https://www.cheapshark.com/redirect?dealID=${d.dealID}`,
      facts: d => [['Sale', `$${d.salePrice}`], ['Normal', `$${d.normalPrice}`], ['Savings', `${Math.round(d.savings)}%`]],
    },
    {
      id: 'cheapshark-search', name: 'CheapShark Game Search', home: 'https://apidocs.cheapshark.com/',
      kw: 'game_search:3 find_game:2 game_price_search:3',
      sample: 'portal',
      url: q => `https://www.cheapshark.com/api/1.0/games?title=${enc(K.term(q))}&limit=5`,
      list: d => d,
      title: 'external',
      body: g => `cheapest $${g.cheapest} · ${g.steamAppID ? 'Steam ' + g.steamAppID : ''}`,
      link: g => `https://www.cheapshark.com/redirect?dealID=${g.cheapestDealID}`,
    },
    {
      id: 'freetogame', name: 'Free-to-Play Games', home: 'https://www.freetogame.com/api-doc',
      kw: 'free_game:3 free_games:3 free_to_play:3 freetogame:3 f2p:3 mmo:2 mmorpg:2 browser_game:2',
      sample: 'free to play games',
      url: () => 'https://www.freetogame.com/api/games?platform=pc',
      list: d => d.slice(0, 5),
      title: 'title',
      body: g => `${g.genre} · ${g.platform}`,
      link: 'game_url',
    },
    {
      id: 'pokeapi', name: 'PokéAPI', home: 'https://pokeapi.co/',
      kw: 'pokemon:3 pokémon:3 pokemon_stats:3 pokedex:3 pokeapi:3 pokemon_type:2 pokemon_moves:2 nintendo:2',
      sample: 'pikachu',
      url: q => `https://pokeapi.co/api/v2/pokemon/${enc(K.term(q).toLowerCase().replace(/\s+/g, '-'))}`,
      list: d => [d],
      title: p => K.cap(p.name),
      body: p => `#${p.id} · ${p.types.map(t => t.type.name).join(', ')} · ${p.height / 10} m`,
      link: p => `https://pokeapi.co/api/v2/pokemon/${p.id}`,
      facts: p => [['Dex', `#${p.id}`], ['Types', p.types.map(t => t.type.name).join(', ')], ['Height', `${p.height / 10} m`], ['Weight', `${p.weight / 10} kg`]],
    },
  ], {
    kw: 'game:3 games:3 gaming:3 console:2 videogame:3',
  });
  K.register('games', {
    id: 'overwatch-heroes', name: 'Overfast API (Overwatch heroes)', home: 'https://overfast-api.tekrop.fr/',
    kw: 'overwatch:3 overwatch_heroes:3 overwatch_hero:3 ow_heroes:2',
    sample: 'overwatch heroes',
    url: () => 'https://overfast-api.tekrop.fr/heroes',
    list: d => d.slice(0, 5),
    title: h => h.name,
    body: h => h.role || '',
    link: h => `https://overfast-api.tekrop.fr/heroes/${h.key}`,
  });
  K.register('games', {
    id: 'ygoprodeck', name: 'YGOPRODeck (Yu-Gi-Oh! cards)', home: 'https://ygoprodeck.com/',
    kw: 'yugioh:3 yu_gi_oh:3 yugioh_cards:3 ygo:3 trading_card:2 yugi:2',
    sample: 'yugioh dark magician',
    url: q => `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${enc(K.term(q))}`,
    list: 'data',
    title: c => c.name,
    body: c => `${c.type} · ${(c.desc || '').slice(0, 120)}`,
    link: c => c.ygoprodeck_url,
  });
  K.register('games', {
    id: 'digimon', name: 'Digi-API (Digimon)', home: 'https://digi-api.com/',
    kw: 'digimon:3 digital_monsters:3 digimon_list:3',
    sample: 'digimon agumon',
    url: q => `https://digi-api.com/api/v1/digimon?name=${enc(K.term(q))}`,
    list: 'content',
    title: d => d.name,
    body: () => 'Digimon entry',
    link: d => d.href,
  });
  K.register('games', {
    id: 'warframe', name: 'Warframe Stats', home: 'https://warframestat.us/',
    kw: 'warframe:3 warframes:3 warframe_stats:3',
    sample: 'warframe',
    url: () => 'https://api.warframestat.us/warframes',
    list: d => d.slice(0, 5),
    title: w => w.name,
    body: w => (w.description || '').slice(0, 120),
    link: w => `https://warframe.fandom.com/wiki/${enc(w.name)}`,
  });
  K.register('games', {
    id: 'speedrun', name: 'speedrun.com (games)', home: 'https://www.speedrun.com/',
    kw: 'speedrun:3 speedruns:3 speedrunning:3 world_record:3 world_records:3 speedrun_games:2',
    sample: 'speedrun mario',
    url: q => `https://www.speedrun.com/api/v1/games?name=${enc(K.term(q))}&max=5`,
    list: 'data',
    title: g => g.names?.international,
    body: g => (g.released ? `Released ${g.released}` : 'speedrun.com game'),
    link: g => g.weblink,
  });
})(Keyless);
