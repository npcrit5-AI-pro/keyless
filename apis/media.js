(function (K) {
  'use strict';
  const enc = K.enc;

  K.category('media', 'Images & media', [
    {
      id: 'commons', name: 'Wikimedia Commons', home: 'https://commons.wikimedia.org/',
      kw: 'image:3 images:3 photo:3 photos:3 picture:2 pictures:2 photograph:2 wikimedia:3 commons:3 illustration:2',
      sample: 'photo of the Eiffel Tower',
      url: q => `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${enc(K.term(q))}&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=320&format=json&origin=*`,
      list: d => Object.values(d.query?.pages || {}),
      title: p => p.title.replace(/^File:/, ''),
      body: p => (p.imageinfo?.[0]?.extmetadata?.ImageDescription?.value || '').replace(/<[^>]*>/g, '').slice(0, 140),
      link: p => p.imageinfo?.[0]?.descriptionurl || `https://commons.wikimedia.org/wiki/${enc(p.title)}`,
    },
    {
      id: 'picsum', name: 'Lorem Picsum', home: 'https://picsum.photos/',
      kw: 'random_photo:3 random_image:3 placeholder_image:3 placeholder:2 lorem_picsum:3 picsum:3',
      sample: 'random photo',
      url: () => 'https://picsum.photos/v2/list?page=1&limit=5',
      list: d => d,
      title: p => `Photo by ${p.author}`,
      body: p => `${p.width}×${p.height} px`,
      link: p => p.url,
    },
    {
      id: 'dicebear', name: 'DiceBear avatars', home: 'https://www.dicebear.com/', proxy: true,
      kw: 'avatar:3 avatars:3 profile_picture:3 dicebear:3 identicon:2',
      sample: 'avatar for Frederick',
      run: async q => {
        const seed = K.term(q) || 'avatar';
        const r = await K.http(`https://api.dicebear.com/9.x/identicon/svg?seed=${enc(seed)}`, { text: true, proxy: true });
        K.need(r.includes('<svg'), 'No avatar returned.');
        return [{ title: `Avatar · ${seed}`, body: 'Generated SVG avatar (identicon style)', link: `https://api.dicebear.com/9.x/identicon/svg?seed=${enc(seed)}` }];
      },
    },
    {
      id: 'podcast-search', name: 'Podcast Index (iTunes podcasts)', home: 'https://podcasts.apple.com/',
      kw: 'podcast:3 podcasts:3 podcast_episodes:3 audio_show:2 listen_podcast:2',
      sample: 'podcast tech',
      url: q => `https://itunes.apple.com/search?media=podcast&limit=5&term=${enc(K.term(q))}`,
      list: 'results',
      title: p => p.collectionName,
      body: p => `${p.artistName || ''} · ${p.trackCount || 0} episodes`,
      link: 'collectionViewUrl',
    },
  ], {
    kw: 'media:2 visual:1 gallery:1 video:2 videos:2 audio:2',
  });
  K.register('media', {
    id: 'imgflip', name: 'Imgflip meme templates', home: 'https://imgflip.com/',
    kw: 'meme:3 memes:3 meme_template:3 imgflip:3 memes_list:2',
    sample: 'memes',
    url: () => 'https://api.imgflip.com/get_memes',
    list: 'data.memes',
    title: m => m.name,
    body: m => `${m.box_count} text boxes`,
    link: m => m.url,
  });
  K.register('media', {
    id: 'iconify', name: 'Iconify (icon search)', home: 'https://iconify.design/',
    kw: 'icons:3 icon:3 iconify:3 svg_icon:2 icon_search:3',
    sample: 'home icon',
    url: q => `https://api.iconify.design/search?query=${enc(K.term(q))}&limit=5`,
    list: 'icons',
    title: s => s,
    body: () => 'Iconify icon set entry',
    link: s => `https://icon-sets.iconify.design/?query=${enc(s.split(':')[1] || s)}`,
  });
})(Keyless);
