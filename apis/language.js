(function (K) {
  'use strict';
  const enc = K.enc;

  const LANGS = {
    french: 'fr', spanish: 'es', german: 'de', italian: 'it', portuguese: 'pt', dutch: 'nl',
    japanese: 'ja', chinese: 'zh-CN', russian: 'ru', arabic: 'ar', korean: 'ko', hindi: 'hi',
  };

  K.category('language', 'Language & words', [
    {
      id: 'wiktionary', name: 'Wiktionary', home: 'https://en.wiktionary.org/',
      kw: 'define:3 definition:3 meaning:3 meanings:3 wiktionary:3 etymology:3 pronounce:2 pronunciation:2 spell:2',
      sample: 'define serendipity',
      run: async q => {
        const word = K.term(q).replace(/\b(define|definition|meaning|meanings|etymology|wiktionary)\b/gi, ' ').trim().split(/\s+/)[0];
        const d = await K.http(`https://en.wiktionary.org/api/rest_v1/page/definition/${enc(word)}`);
        return (d.en || []).slice(0, 4).map(p => ({
          title: `${word} · ${p.partOfSpeech}`,
          body: p.definitions?.[0]?.definition || '',
          link: `https://en.wiktionary.org/wiki/${enc(word)}`,
        }));
      },
    },
    {
      id: 'datamuse', name: 'Datamuse', home: 'https://www.datamuse.com/api/', proxy: true,
      kw: 'synonym:3 synonyms:3 similar:2 thesaurus:3 related:1 rhyme:3 rhymes:3 crossword:2 means:1',
      sample: 'synonyms for happy',
      run: async q => {
        const t = K.term(q);
        const d = await K.http(`https://api.datamuse.com/words?max=10&ml=${enc(t)}`, { proxy: true });
        K.need(d.length, 'No related words found.');
        return [{ title: t, body: d.map(w => w.word).join(', '), link: 'https://www.datamuse.com/api/' }];
      },
    },
    {
      id: 'mymemory', name: 'MyMemory Translation', home: 'https://mymemory.translated.net/',
      kw: 'translate:3 translation:2 translations:2 translator:2 translated:2',
      sample: 'translate hello to french',
      run: async q => {
        const m = q.match(/translate\s+(.+?)(?:\s+(?:to|into)\s+([a-z]+))?$/i);
        const text = (m ? m[1] : q).trim();
        const lang = LANGS[((m && m[2]) || 'french').toLowerCase()] || 'fr';
        const d = await K.http(`https://api.mymemory.translated.net/get?q=${enc(text)}&langpair=en%7C${lang}`);
        K.need(d.responseData && d.responseData.translatedText, 'No translation returned.');
        return [{ title: d.responseData.translatedText, body: `${text} → ${lang}`, link: 'https://mymemory.translated.net/' }];
      },
    },
    {
      id: 'languagetool', name: 'LanguageTool', home: 'https://languagetool.org/',
      kw: 'grammar:3 spelling:3 spellcheck:3 proofread:3 typo:2 typos:2 correct:1',
      sample: 'grammar check: he go to school yesterday',
      run: async q => {
        const text = q.replace(/^.*?(grammar check|spell check|spellcheck|proofread|grammar|spelling)\s*:?\s*/i, '').trim() || q;
        const d = await K.http('https://api.languagetool.org/v2/check', {
          method: 'POST',
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          body: `text=${enc(text)}&language=en-US`,
        });
        return d.matches.slice(0, 5).map(m => {
          const c = m.context;
          const fix = (m.replacements || []).slice(0, 3).map(r => r.value).join(', ');
          return {
            title: m.message,
            body: `"${c.text.slice(c.offset, c.offset + c.length)}"${fix ? ` → ${fix}` : ''}`,
            link: 'https://languagetool.org/',
          };
        });
      },
    },
    {
      id: 'urbandictionary', name: 'Urban Dictionary', home: 'https://www.urbandictionary.com/',
      kw: 'slang:3 urban:2 urbandictionary:3 urban_dictionary:3',
      sample: 'yeet',
      url: q => `https://api.urbandictionary.com/v0/define?term=${enc(K.term(q))}`,
      list: 'list',
      title: 'word',
      body: x => (x.definition || '').replace(/[\[\]]/g, ''),
      link: 'permalink',
    },
  ], {
    kw: 'language:1 words:1 dictionary:2 word:1',
  });
})(Keyless);
