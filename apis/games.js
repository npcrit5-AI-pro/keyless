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
  K.register('games', {
    id: 'gamerpower', name: 'GamerPower (free game giveaways)', home: 'https://www.gamerpower.com/',
    kw: 'game_giveaways:3 free_games:3 gamerpower:3 free_game_giveaway:3 steam_giveaway:2 epic_free_games:2',
    sample: 'free games',
    url: () => 'https://www.gamerpower.com/api/giveaways',
    list: d => d,
    title: g => g.title,
    body: g => `${g.worth} · ${g.platforms || ''}`,
    link: g => g.open_giveaway_url || g.gamerpower_url,
  });
  K.register('games', {
    id: 'fortnite-news', name: 'Fortnite-API (news)', home: 'https://fortnite-api.com/',
    kw: 'fortnite:3 fortnite_news:3 battle_royale:2 epic_games_news:2 fortnite_updates:3',
    sample: 'fortnite news',
    url: () => 'https://fortnite-api.com/v2/news',
    list: 'data.br.motds',
    title: m => m.title,
    body: m => (m.body || '').slice(0, 140),
    link: () => 'https://www.fortnite.com/news',
  });
  K.register('games', {
    id: 'eldenring-bosses', name: 'Elden Ring API (bosses)', home: 'https://eldenring.fanapis.com/',
    kw: 'elden_ring:3 eldenring:3 elden_ring_bosses:3 soulslike_bosses:2 fromsoftware_games:2',
    sample: 'elden ring bosses',
    url: () => 'https://eldenring.fanapis.com/api/bosses?limit=5',
    list: 'data',
    title: b => b.name,
    body: b => b.location || 'Elden Ring boss',
    link: () => 'https://eldenring.fanapis.com/',
  });
  K.register('games', {
    id: 'steam-store', name: 'Steam store search', home: 'https://store.steampowered.com/', proxy: true,
    kw: 'steam:3 steam_games:3 steam_store:3 valve_games:2 pc_games:2 steam_prices:3',
    sample: 'portal',
    url: q => `https://store.steampowered.com/api/storesearch/?term=${enc(K.term(q))}&cc=us&l=en`,
    list: 'items',
    title: i => i.name,
    body: i => (i.price ? `$${(i.price.final / 100).toFixed(2)} · Steam app ${i.id}` : `Steam app ${i.id}`),
    link: i => `https://store.steampowered.com/app/${i.id}`,
  });
  K.register('games', {
    id: 'mojang-profile', name: 'Mojang (Minecraft username lookup)', home: 'https://api.mojang.com/', proxy: true,
    kw: 'minecraft:3 minecraft_username:3 mojang:3 minecraft_uuid:3 minecraft_player:2',
    sample: 'Notch',
    url: q => `https://api.mojang.com/users/profiles/minecraft/${enc(K.term(q).split(' ')[0] || 'Notch')}`,
    list: d => [d],
    title: d => d.name,
    body: d => `UUID ${d.id}`,
    link: d => `https://namemc.com/profile/${d.name}`,
  });
  K.register('games', {
    id: 'opendota-heroes', name: 'OpenDota (Dota 2 heroes)', home: 'https://www.opendota.com/',
    kw: 'dota:3 dota_2:3 dota_heroes:3 opendota:3 moba:2 dota_hero:3',
    sample: 'dota heroes',
    url: () => 'https://api.opendota.com/api/heroes',
    list: d => d,
    title: h => h.localized_name,
    body: h => `${(h.primary_attr || '').toUpperCase()} · roles: ${(h.roles || []).slice(0, 3).join(', ')}`,
    link: () => 'https://www.opendota.com/heroes',
  });
  K.register('games', {
    id: 'scryfall-cards', name: 'Scryfall (Magic: The Gathering cards)', home: 'https://scryfall.com/',
    kw: 'magic_the_gathering:3 mtg:3 scryfall:3 mtg_cards:3 magic_card:3 mtg_card:3',
    sample: 'lightning bolt',
    url: q => `https://api.scryfall.com/cards/named?fuzzy=${enc(K.term(q))}`,
    list: d => [d],
    title: c => c.name,
    body: c => `${c.type_line || ''}${c.mana_cost ? ' · ' + c.mana_cost : ''}`,
    link: c => c.scryfall_uri,
  });
  K.register('games', {
    id: 'pokemontcg', name: 'Pokémon TCG (cards)', home: 'https://pokemontcg.io/',
    kw: 'pokemontcg:3 tcg:3 trading_card_game:3 tcg_cards:3',
    sample: 'pikachu',
    url: q => `https://api.pokemontcg.io/v2/cards?q=name:${enc(K.term(q))}&pageSize=5`,
    list: 'data',
    title: c => c.name,
    body: c => `${c.set?.name || ''} · ${c.rarity || ''}`,
    link: c => c.images?.small || 'https://pokemontcg.io/',
  });
  K.register('games', {
    id: 'lichess-user', name: 'Lichess (player profile)', home: 'https://lichess.org/',
    kw: 'lichess:3 chess_player:3 chess_rating:3 chess_games:3 online_chess:2',
    sample: 'DrNykterstein',
    url: q => `https://lichess.org/api/user/${enc(K.term(q).split(' ')[0] || 'DrNykterstein')}`,
    list: d => [d],
    title: u => u.username,
    body: u => `Blitz ${u.perfs?.blitz?.rating ?? 'n/a'} · ${u.count?.all ?? 0} games`,
    link: u => u.url,
  });
  K.register('games', {
    id: 'chesscom-player', name: 'Chess.com (player profile)', home: 'https://www.chess.com/',
    kw: 'chess_com:3 chesscom:3 chess_players:2 chess_profile:2',
    sample: 'hikaru',
    url: q => `https://api.chess.com/pub/player/${enc(K.term(q).split(' ')[0] || 'hikaru')}`,
    list: d => [d],
    title: u => u.username,
    body: u => `${u.title || 'Player'} · ${(u.country || '').split('/').pop()}`,
    link: u => u.url,
  });
})(Keyless);
