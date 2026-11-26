(function (K) {
  'use strict';
  const enc = K.enc;

  K.category('finance', 'Finance & crypto', [
    {
      id: 'currency', name: 'Frankfurter (ECB rates)', home: 'https://frankfurter.dev/', general: true,
      kw: 'exchange:3 currency:3 currencies:2 forex:3 euro:2 dollar:2 pound:2 yen:2 convert:2 rate:2 rates:2 usd:2 eur:2 gbp:2',
      sample: 'convert 100 USD to EUR',
      run: async q => {
        const m = q.match(/(\d+(?:\.\d+)?)\s*([a-z]{3})\b.*?\b(?:to|in|->)\s*([a-z]{3})\b/i)
          || q.match(/\b([a-z]{3})\b.*?\b(?:to|in)\s*([a-z]{3})\b/i);
        K.need(m, 'Try "100 USD to EUR".');
        const amount = m.length === 4 ? Number(m[1]) : 1;
        const from = (m.length === 4 ? m[2] : m[1]).toUpperCase();
        const to = (m.length === 4 ? m[3] : m[2]).toUpperCase();
        const d = await K.http(`https://api.frankfurter.dev/v1/latest?amount=${amount}&base=${from}&symbols=${to}`);
        const v = d.rates[to];
        return [{
          title: `${amount} ${from} = ${v.toFixed(2)} ${to}`,
          body: `ECB reference rate on ${d.date}`,
          link: 'https://frankfurter.dev/',
          facts: [['Amount', `${amount} ${from}`], ['Rate', `${v.toFixed(2)} ${to}`], ['Date', d.date]],
        }];
      },
    },
    {
      id: 'erapi', name: 'Open Exchange Rates (ER-API)', home: 'https://www.exchangerate-api.com/',
      kw: 'exchange_rates:3 currency_rates:3 forex_rates:3 base_currency:2',
      sample: 'exchange rates USD',
      url: () => 'https://open.er-api.com/v6/latest/USD',
      list: d => [d],
      title: () => 'Exchange rates · base USD',
      body: d => `EUR ${d.rates.EUR.toFixed(3)} · GBP ${d.rates.GBP.toFixed(3)} · JPY ${d.rates.JPY.toFixed(2)} · updated ${d.time_last_update_utc.slice(5, 16)}`,
      link: 'https://www.exchangerate-api.com/',
    },
    {
      id: 'coingecko', name: 'CoinGecko', home: 'https://www.coingecko.com/',
      kw: 'crypto:3 cryptocurrency:3 bitcoin:3 ethereum:3 btc:3 eth:3 coin:2 coins:2 token:2 solana:2 dogecoin:2 price:1',
      sample: 'bitcoin price',
      run: async q => {
        const coins = [['bitcoin', 'btc'], ['ethereum', 'eth'], ['solana', 'sol'], ['dogecoin', 'doge'], ['cardano', 'ada']];
        const found = coins.find(([n, s]) => new RegExp(`\\b(${n}|${s})\\b`, 'i').test(q)) || coins[0];
        const d = await K.http(`https://api.coingecko.com/api/v3/simple/price?ids=${found[0]}&vs_currencies=usd,eur&include_24hr_change=true`);
        const c = d[found[0]];
        return [{
          title: `${K.cap(found[0])} · $${c.usd.toLocaleString()}`,
          body: `€${c.eur.toLocaleString()} · 24h ${c.usd_24h_change.toFixed(2)}%`,
          link: `https://www.coingecko.com/en/coins/${found[0]}`,
          facts: [['USD', `$${c.usd.toLocaleString()}`], ['EUR', `€${c.eur.toLocaleString()}`], ['24h', `${c.usd_24h_change.toFixed(2)}%`]],
        }];
      },
    },
    {
      id: 'kraken', name: 'Kraken Public Ticker', home: 'https://www.kraken.com/',
      kw: 'kraken:3 kraken_price:3',
      sample: 'kraken XBTUSD',
      url: () => 'https://api.kraken.com/0/public/Ticker?pair=XBTUSD',
      list: d => Object.values(d.result || {}),
      title: () => 'Kraken · XBT/USD',
      body: x => `last ${Number(x.c[0]).toLocaleString()} · 24h high ${Number(x.h[1]).toLocaleString()} · low ${Number(x.l[1]).toLocaleString()}`,
      link: 'https://www.kraken.com/',
    },
    {
      id: 'coinbase', name: 'Coinbase Spot Price', home: 'https://developers.coinbase.com/',
      kw: 'coinbase:3 spot_price:3',
      sample: 'coinbase bitcoin spot',
      url: () => 'https://api.coinbase.com/v2/prices/BTC-USD/spot',
      list: d => [d.data],
      title: x => `${x.base}/${x.currency} spot`,
      body: x => `$${Number(x.amount).toLocaleString()}`,
      link: 'https://developers.coinbase.com/',
    },
    {
      id: 'mempool', name: 'mempool.space Fees', home: 'https://mempool.space/',
      kw: 'bitcoin_fees:3 mempool:3 transaction_fee:3 block_height:3 hashrate:2 bitcoin_block:2',
      sample: 'bitcoin fees',
      url: () => 'https://mempool.space/api/v1/fees/recommended',
      list: d => [d],
      title: () => 'Bitcoin recommended fees',
      body: d => `fastest ${d.fastestFee} sat/vB · hour ${d.hourFee} sat/vB · economy ${d.economyFee} sat/vB`,
      link: 'https://mempool.space/',
    },
    {
      id: 'blockchain-info', name: 'Blockchain.com Stats', home: 'https://www.blockchain.com/',
      kw: 'blockchain_stats:3 bitcoin_stats:3 hash_rate:2 bitcoin_supply:3 bitcoin_network:2',
      sample: 'bitcoin network stats',
      url: () => 'https://api.blockchain.info/stats',
      list: d => [d],
      title: () => 'Bitcoin network',
      body: d => `market price $${Math.round(d.market_price_usd).toLocaleString()} · ${d.n_blocks_total.toLocaleString()} blocks`,
      link: 'https://www.blockchain.com/explorer',
    },
    {
      id: 'treasury', name: 'US Treasury Fiscal Data', home: 'https://fiscaldata.treasury.gov/',
      kw: 'treasury:3 national_debt:3 debt_to_the_penny:3 us_debt:3 federal_debt:3 treasury_rates:2',
      sample: 'US national debt',
      url: () => 'https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny?sort=-record_date&page[size]=5',
      list: 'data',
      title: x => `Debt to the penny · ${x.record_date}`,
      body: x => `$${Number(x.tot_pub_debt_out_amt).toLocaleString(undefined, { maximumFractionDigits: 0 })} total public debt`,
      link: 'https://fiscaldata.treasury.gov/',
    },
    {
      id: 'worldbank', name: 'World Bank Indicators', home: 'https://data.worldbank.org/',
      kw: 'gdp:3 gross_domestic_product:3 inflation:3 economy:2 economic:2 economics:2 unemployment:3 world_bank:3 indicator:2 indicators:2',
      sample: 'GDP US',
      run: async q => {
        const iso = q.split(/\s+/).find(w => /^[a-z]{2,3}$/i.test(w) && !/^(gdp|of|for|in)$/i.test(w)) || 'US';
        const d = await K.http(`https://api.worldbank.org/v2/country/${enc(iso)}/indicator/NY.GDP.MKTP.CD?format=json&per_page=5`);
        const rows = ((d && d[1]) || []).filter(r => r.value != null);
        K.need(rows.length, `No GDP data for ${iso}.`);
        return rows.slice(0, 5).map(r => ({
          title: `${r.country.value} · GDP ${r.date}`,
          body: `$${(r.value / 1e9).toFixed(1)}B`,
          link: 'https://data.worldbank.org/indicator/NY.GDP.MKTP.CD',
        }));
      },
    },
    {
      id: 'ecbstats', name: 'ECB Data Portal', home: 'https://data.ecb.europa.eu/',
      kw: 'ecb:3 euro_area:2 eurozone:3 ecb_rate:3 euro_inflation:2',
      sample: 'ECB euro reference rate',
      url: () => 'https://data-api.ecb.europa.eu/service/data/EXR/D.USD.EUR.SP00.A?lastNObservations=3&format=jsondata',
      list: d => (d.dataSets?.[0] ? [d] : []),
      title: () => 'ECB EUR/USD reference',
      body: d => {
        const s = d.dataSets[0].series['0:0:0:0:0'];
        const obs = Object.values(s.observations).pop();
        return `${obs[0]} USD per EUR`;
      },
      link: 'https://data.ecb.europa.eu/',
    },
    {
      id: 'nbp', name: 'National Bank of Poland Rates', home: 'https://api.nbp.pl/',
      kw: 'zloty:3 polish_currency:3 nbp:3 poland_rates:2 pln:3',
      sample: 'PLN exchange rate',
      url: () => 'https://api.nbp.pl/api/exchangerates/rates/a/usd/?format=json',
      list: 'rates',
      title: () => 'NBP · USD/PLN',
      body: x => `${x.mid} PLN · ${x.effectiveDate}`,
      link: 'https://api.nbp.pl/',
    },
    {
      id: 'cbr', name: 'Central Bank of Russia Rates (mirror)', home: 'https://www.cbr-xml-daily.ru/', proxy: true,
      kw: 'ruble:3 russian_currency:3 cbr:3 central_bank_russia:3 rub:2',
      sample: 'ruble rate',
      url: () => 'https://www.cbr-xml-daily.ru/daily_json.js',
      list: d => Object.values(d.Valute).slice(0, 5),
      title: x => `${x.CharCode} · ${x.Name}`,
      body: x => `${x.Value.toFixed(2)} RUB`,
      link: 'https://www.cbr.ru/',
    },
  ], {
    kw: 'finance:2 money:2 invest:2 investing:2 market:2 markets:2 bank:1',
  });
  K.register('finance', {
    id: 'fawaz-currency', name: 'Currency API (200+ currencies)', home: 'https://github.com/fawazahmed0/exchange-api',
    kw: 'currency_list:2 currency_codes:3 currencies_list:2 dinar:2 rupee:2 peso:2 exchange_list:2',
    sample: 'usd rates',
    url: () => 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json',
    list: d => [d],
    title: () => 'Currency rates · base USD',
    body: d => `EUR ${d.usd.eur.toFixed(3)} · GBP ${d.usd.gbp.toFixed(3)} · ${Object.keys(d.usd).length} currencies`,
    link: () => 'https://github.com/fawazahmed0/exchange-api',
  });
  K.register('finance', {
    id: 'fear-greed', name: 'Crypto Fear & Greed Index', home: 'https://alternative.me/crypto/fear-and-greed-index/',
    kw: 'fear_greed:3 fear_and_greed:3 market_sentiment:3 crypto_sentiment:3 sentiment:2',
    sample: 'fear and greed index',
    url: () => 'https://api.alternative.me/fng/?limit=5',
    list: 'data',
    title: d => `${d.value_classification} · ${d.value}/100`,
    body: d => new Date(Number(d.timestamp) * 1000).toISOString().slice(0, 10),
    link: () => 'https://alternative.me/crypto/fear-and-greed-index/',
  });
  K.register('finance', {
    id: 'coinpaprika', name: 'CoinPaprika', home: 'https://coinpaprika.com/',
    kw: 'coin_search:2 crypto_search:3 coinpaprika:3 token_search:2',
    sample: 'ethereum',
    url: q => `https://api.coinpaprika.com/v1/search?q=${enc(K.term(q))}&c=currencies&limit=5`,
    list: 'currencies',
    title: 'name',
    body: c => `${c.symbol} · rank ${c.rank ?? 'n/a'} · ${c.type}`,
    link: c => `https://coinpaprika.com/coin/${c.id}/`,
  });
  K.register('finance', {
    id: 'gleif', name: 'GLEIF LEI Register', home: 'https://www.gleif.org/',
    kw: 'lei:3 legal_entity:3 legal_entities:3 gleif:3 company_identifier:2',
    sample: 'Apple',
    url: q => `https://api.gleif.org/api/v1/lei-records?page%5Bsize%5D=5&filter%5Bentity.legalName%5D=${enc(K.term(q))}`,
    list: 'data',
    title: r => r.attributes.entity.legalName.name,
    body: r => `${r.attributes.entity.legalAddress?.country || ''} · LEI ${r.id}`,
    link: r => `https://search.gleif.org/#/record/${r.id}`,
  });
  K.register('finance', {
    id: 'boc-fx', name: 'Bank of Canada exchange rates', home: 'https://www.bankofcanada.ca/',
    kw: 'bank_of_canada:3 boc:3 cad_rate:3 canadian_dollar_rate:3 cad_exchange:2',
    sample: 'canadian dollar rate',
    url: () => 'https://www.bankofcanada.ca/valet/observations/FXUSDCAD/json?recent=5',
    list: 'observations',
    title: o => `USD → CAD ${o.FXUSDCAD?.v}`,
    body: o => o.d,
    link: () => 'https://www.bankofcanada.ca/rates/exchange/',
  });
})(Keyless);
