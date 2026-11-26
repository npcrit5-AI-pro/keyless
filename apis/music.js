(function (K) {
  'use strict';
  const enc = K.enc;

  K.category('music', 'Music', [
    {
      id: 'deezer', name: 'Deezer Search', home: 'https://developers.deezer.com/api', proxy: true,
      kw: 'deezer:3 playlist:2 playlists:2 listen:2 podcast:2 podcasts:2',
      sample: 'deezer daft punk',
      url: q => `https://api.deezer.com/search?q=${enc(K.term(q))}&limit=5`,
      list: 'data',
      title: t => `${t.title} · ${t.artist.name}`,
      body: t => t.album?.title || '',
      link: 'link',
    },
    {
      id: 'itunes', name: 'Apple iTunes Search', home: 'https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/',
      kw: 'itunes:3 apple_music:3 song_preview:2 album_art:2 soundtrack:2',
      sample: 'itunes bohemian rhapsody',
      url: q => `https://itunes.apple.com/search?term=${enc(K.term(q))}&entity=song&limit=5`,
      list: 'results',
      title: t => `${t.trackName} · ${t.artistName}`,
      body: t => `${t.collectionName || ''} · ${t.primaryGenreName || ''}`,
      link: 'trackViewUrl',
    },
    {
      id: 'radiobrowser', name: 'Radio Browser', home: 'https://www.radio-browser.info/',
      kw: 'radio:3 radio_station:3 radio_stations:3 internet_radio:3 fm:2 streaming_radio:2',
      sample: 'jazz radio',
      url: q => `https://de1.api.radio-browser.info/json/stations/search?name=${enc(K.term(q))}&limit=5&hidebroken=true&order=clickcount&reverse=true`,
      list: d => d,
      title: s => s.name,
      body: s => `${s.country || ''} · ${s.tags || ''} · ${s.codec || ''}`,
      link: s => s.homepage || s.url_resolved,
    },
  ], {
    kw: 'music:2 song:1 songs:1',
  });
  K.register('music', {
    id: 'lrclib', name: 'LRCLIB (synced lyrics)', home: 'https://lrclib.net/',
    kw: 'lyrics:3 lyric:3 song_lyrics:3 synced_lyrics:3 lrc:3 words_of_song:2',
    sample: 'lyrics yellow',
    url: q => `https://lrclib.net/api/search?q=${enc(K.term(q))}`,
    list: d => d.slice(0, 5),
    title: t => `${t.trackName} · ${t.artistName}`,
    body: t => t.albumName || '',
    link: () => 'https://lrclib.net/',
  });
  K.register('music', {
    id: 'listenbrainz', name: 'ListenBrainz (user search)', home: 'https://listenbrainz.org/',
    kw: 'listenbrainz:3 scrobbles:2 listening_history:2 music_listeners:2',
    sample: 'listenbrainz rob',
    url: q => `https://api.listenbrainz.org/1/search/users/?search_term=${enc(K.term(q))}`,
    list: d => d.users || [],
    title: u => u.user_name,
    body: () => 'ListenBrainz user profile',
    link: u => `https://listenbrainz.org/user/${u.user_name}/`,
  });
})(Keyless);
