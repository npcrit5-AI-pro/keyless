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
  K.register('finance', {
    id: 'gemini-ticker', name: 'Gemini exchange (BTC/USD)', home: 'https://www.gemini.com/',
    kw: 'gemini_exchange:3 gemini_crypto:3 gemini_price:3 gemini_btc:2',
    sample: 'gemini bitcoin price',
    url: () => 'https://api.gemini.com/v1/pubticker/btcusd',
    list: d => [d],
    title: () => 'BTC/USD on Gemini',
    body: d => `Last ${d.last} · bid ${d.bid} · ask ${d.ask}`,
    link: () => 'https://www.gemini.com/',
  });
  K.register('finance', {
    id: 'bitstamp-ticker', name: 'Bitstamp (BTC/USD)', home: 'https://www.bitstamp.net/', proxy: true,
    kw: 'bitstamp:3 bitstamp_price:3 bitstamp_ticker:3 bitstamp_btc:2',
    sample: 'bitstamp price',
    url: () => 'https://www.bitstamp.net/api/v2/ticker/btcusd/',
    list: d => [d],
    title: () => 'BTC/USD on Bitstamp',
    body: d => `Last ${d.last} · high ${d.high} · low ${d.low}`,
    link: () => 'https://www.bitstamp.net/',
  });
  K.register('finance', {
    id: 'bitfinex-ticker', name: 'Bitfinex (BTC/USD)', home: 'https://www.bitfinex.com/', proxy: true,
    kw: 'bitfinex:3 bitfinex_price:3 bitfinex_ticker:3 bitfinex_btc:2',
    sample: 'bitfinex price',
    url: () => 'https://api-pub.bitfinex.com/v2/ticker/tBTCUSD',
    list: d => [{ bid: d[0], ask: d[2], last: d[6] }],
    title: () => 'BTC/USD on Bitfinex',
    body: x => `Last ${x.last} · bid ${x.bid} · ask ${x.ask}`,
    link: () => 'https://www.bitfinex.com/',
  });
  K.register('finance', {
    id: 'kucoin-price', name: 'KuCoin (BTC-USDT)', home: 'https://www.kucoin.com/', proxy: true,
    kw: 'kucoin:3 kucoin_price:3 kucoin_ticker:3 kucoin_btc:2',
    sample: 'kucoin price',
    url: () => 'https://api.kucoin.com/api/v1/market/orderbook/level1?symbol=BTC-USDT',
    list: d => [d.data],
    title: () => 'BTC-USDT on KuCoin',
    body: x => `Price ${x.price} · size ${x.size}`,
    link: () => 'https://www.kucoin.com/',
  });
  K.register('finance', {
    id: 'bitso-ticker', name: 'Bitso (BTC/MXN)', home: 'https://bitso.com/', proxy: true,
    kw: 'bitso:3 bitso_price:3 bitso_ticker:3 mexican_peso_crypto:2',
    sample: 'bitso price',
    url: () => 'https://api.bitso.com/v3/ticker/?book=btc_mxn',
    list: d => [d.payload],
    title: () => 'BTC/MXN on Bitso',
    body: x => `Last ${x.last} MXN · high ${x.high}`,
    link: () => 'https://bitso.com/',
  });
  K.register('finance', {
    id: 'hitbtc-ticker', name: 'HitBTC (BTC/USD)', home: 'https://hitbtc.com/',
    kw: 'hitbtc:3 hitbtc_price:3 hitbtc_ticker:3 hitbtc_btc:2',
    sample: 'hitbtc price',
    url: () => 'https://api.hitbtc.com/api/2/public/ticker/BTCUSD',
    list: d => [d],
    title: () => 'BTC/USD on HitBTC',
    body: d => `Last ${d.last} · volume ${d.volume}`,
    link: () => 'https://hitbtc.com/',
  });
  K.register('finance', {
    id: 'binance-us-price', name: 'Binance.US (price)', home: 'https://www.binance.us/',
    kw: 'binance_us:3 binance_price:3 binance_us_price:3 binance_ticker:2',
    sample: 'binance us price',
    url: () => 'https://api.binance.us/api/v3/ticker/price?symbol=BTCUSD',
    list: d => [d],
    title: x => `${x.symbol} on Binance.US`,
    body: x => `Price ${x.price}`,
    link: () => 'https://www.binance.us/',
  });
  K.register('finance', {
    id: 'dexscreener-search', name: 'DEX Screener (token pairs)', home: 'https://dexscreener.com/',
    kw: 'dex:3 dexscreener:3 defi_tokens:2 token_price:3 dex_pairs:3 decentralized_exchange:2',
    sample: 'pepe',
    url: q => `https://api.dexscreener.com/latest/dex/search?q=${enc(K.term(q))}`,
    list: 'pairs',
    title: p => `${p.baseToken?.symbol}/${p.quoteToken?.symbol} on ${p.chainId}`,
    body: p => `$${p.priceUsd ?? '?'} · liquidity $${Math.round(p.liquidity?.usd || 0)}`,
    link: p => p.url,
  });
  K.register('finance', {
    id: 'defillama-protocols', name: 'DefiLlama (top DeFi protocols)', home: 'https://defillama.com/',
    kw: 'defi:3 defi_protocols:3 tvl:3 total_value_locked:3 defillama:3 defi_tvl:3',
    sample: 'defi protocols',
    url: () => 'https://api.llama.fi/protocols',
    list: d => [...d].sort((a, b) => (b.tvl || 0) - (a.tvl || 0)),
    title: p => p.name,
    body: p => `TVL $${((p.tvl || 0) / 1e9).toFixed(2)}B · ${p.category || 'DeFi'}`,
    link: p => p.url || 'https://defillama.com/',
  });
  K.register('finance', {
    id: 'defillama-chains', name: 'DefiLlama (blockchains by TVL)', home: 'https://defillama.com/chains',
    kw: 'blockchain_tvl:3 chains_tvl:3 layer_1_tvl:2 blockchain_rankings:2 defillama_chains:3',
    sample: 'blockchain tvl',
    url: () => 'https://api.llama.fi/v2/chains',
    list: d => [...d].sort((a, b) => (b.tvl || 0) - (a.tvl || 0)),
    title: c => c.name,
    body: c => `TVL $${((c.tvl || 0) / 1e9).toFixed(2)}B`,
    link: () => 'https://defillama.com/chains',
  });
  K.register('finance', {
    id: 'yahoo-chart', name: 'Yahoo Finance chart (stock quote)', home: 'https://finance.yahoo.com/', proxy: true,
    kw: 'stock:3 stock_price:3 share_price:3 yahoo_finance:3 ticker_symbol:2 nasdaq:2 stocks:2',
    sample: 'AAPL',
    url: q => `https://query1.finance.yahoo.com/v8/finance/chart/${enc((K.term(q).split(' ')[0] || 'AAPL').toUpperCase())}?range=1d&interval=1d`,
    list: 'chart.result',
    title: r => `${r.meta.symbol} · ${r.meta.currency}`,
    body: r => `Price ${r.meta.regularMarketPrice} (${r.meta.exchangeName})`,
    link: r => `https://finance.yahoo.com/quote/${r.meta.symbol}`,
  });
  K.register('finance', {
    id: 'coinlore-tickers', name: 'CoinLore (top coins)', home: 'https://www.coinlore.com/',
    kw: 'crypto_prices:3 top_crypto:3 coin_prices:3 coinlore:3 crypto_ranking:2',
    sample: 'top crypto coins',
    url: () => 'https://api.coinlore.net/api/tickers/?start=0&limit=5',
    list: 'data',
    title: c => c.name,
    body: c => `${c.symbol} · $${c.price_usd} · rank ${c.rank}`,
    link: c => `https://www.coinlore.com/coin/${c.nameid}/`,
  });
  K.register('finance', {
    id: 'coincheck-ticker', name: 'Coincheck (BTC/JPY)', home: 'https://coincheck.com/', proxy: true,
    kw: 'coincheck:3 coincheck_price:3 yen_crypto:2 japan_crypto:2',
    sample: 'coincheck price',
    url: () => 'https://coincheck.com/api/ticker',
    list: d => [d],
    title: () => 'BTC/JPY on Coincheck',
    body: d => `Last ${d.last} JPY · high ${d.high}`,
    link: () => 'https://coincheck.com/',
  });
  K.register('finance', {
    id: 'zaif-ticker', name: 'Zaif (BTC/JPY)', home: 'https://zaif.jp/', proxy: true,
    kw: 'zaif:3 zaif_price:3 zaif_ticker:3 japan_bitcoin:2',
    sample: 'zaif price',
    url: () => 'https://api.zaif.jp/api/1/ticker/btc_jpy',
    list: d => [d],
    title: () => 'BTC/JPY on Zaif',
    body: d => `Last ${d.last} JPY · volume ${d.volume}`,
    link: () => 'https://zaif.jp/',
  });
  K.register('finance', {
    id: 'bitflyer-ticker', name: 'bitFlyer (BTC/JPY)', home: 'https://bitflyer.com/', proxy: true,
    kw: 'bitflyer:3 bitflyer_price:3 bitflyer_ticker:3 bitflyer_btc:2',
    sample: 'bitflyer price',
    url: () => 'https://api.bitflyer.com/v1/ticker',
    list: d => [d],
    title: () => 'BTC/JPY on bitFlyer',
    body: d => `Best bid ${d.best_bid} · best ask ${d.best_ask}`,
    link: () => 'https://bitflyer.com/',
  });
  K.register('finance', {
    id: 'bithumb-ticker', name: 'Bithumb (BTC/KRW)', home: 'https://www.bithumb.com/',
    kw: 'bithumb:3 bithumb_price:3 korean_crypto:2 korea_bitcoin:2 krw_crypto:2',
    sample: 'bithumb price',
    url: () => 'https://api.bithumb.com/public/ticker/BTC_KRW',
    list: d => [d.data],
    title: () => 'BTC/KRW on Bithumb',
    body: x => `Closing ${x.closing_price} KRW · 24h volume ${x.units_traded_24H}`,
    link: () => 'https://www.bithumb.com/',
  });
  K.register('finance', {
    id: 'upbit-ticker', name: 'Upbit (BTC/KRW)', home: 'https://upbit.com/',
    kw: 'upbit:3 upbit_price:3 upbit_ticker:3 korean_exchange:2',
    sample: 'upbit price',
    url: () => 'https://api.upbit.com/v1/ticker?markets=KRW-BTC',
    list: d => d,
    title: x => x.market,
    body: x => `Trade ${x.trade_price} KRW · change ${x.signed_change_rate}`,
    link: () => 'https://upbit.com/',
  });
  K.register('finance', {
    id: 'gateio-tickers', name: 'Gate.io (BTC/USDT)', home: 'https://www.gate.io/',
    kw: 'gateio:3 gate_io:3 gate_price:2 gate_ticker:3',
    sample: 'gate io price',
    url: () => 'https://api.gateio.ws/api/v4/spot/tickers?currency_pair=BTC_USDT',
    list: d => d,
    title: x => x.currency_pair,
    body: x => `Last ${x.last} · 24h high ${x.high_24h}`,
    link: () => 'https://www.gate.io/',
  });
  K.register('finance', {
    id: 'huobi-ticker', name: 'Huobi (BTC/USDT)', home: 'https://www.huobi.com/',
    kw: 'huobi:3 huobi_price:3 huobi_ticker:3 htx_price:2',
    sample: 'huobi price',
    url: () => 'https://api.huobi.pro/market/detail/merged?symbol=btcusdt',
    list: d => [d.tick],
    title: () => 'BTC/USDT on Huobi',
    body: x => `Close ${x.close} · high ${x.high} · low ${x.low}`,
    link: () => 'https://www.huobi.com/',
  });
  K.register('finance', {
    id: 'okx-ticker', name: 'OKX (BTC-USDT)', home: 'https://www.okx.com/',
    kw: 'okx:3 okx_price:3 okx_ticker:3 okx_btc:2',
    sample: 'okx price',
    url: () => 'https://www.okx.com/api/v5/market/ticker?instId=BTC-USDT',
    list: 'data',
    title: x => x.instId,
    body: x => `Last ${x.last} · 24h vol ${x.vol24h}`,
    link: () => 'https://www.okx.com/',
  });
  K.register('finance', {
    id: 'mexc-price', name: 'MEXC (BTC-USDT price)', home: 'https://www.mexc.com/', proxy: true,
    kw: 'mexc:3 mexc_price:3 mexc_ticker:3',
    sample: 'mexc price',
    url: () => 'https://api.mexc.com/api/v3/ticker/price?symbol=BTCUSDT',
    list: d => [d],
    title: d => `${d.symbol} on MEXC`,
    body: d => `Price ${d.price}`,
    link: () => 'https://www.mexc.com/',
  });
  K.register('finance', {
    id: 'exmo-ticker', name: 'EXMO (crypto tickers)', home: 'https://exmo.me/',
    kw: 'exmo:3 exmo_price:3 exmo_ticker:3',
    sample: 'exmo price',
    url: () => 'https://api.exmo.com/v1.1/ticker',
    list: d => Object.entries(d).slice(0, 5),
    title: ([pair]) => `${pair} on EXMO`,
    body: ([, t]) => `Last ${t.last_trade} · buy ${t.buy_price} · sell ${t.sell_price}`,
    link: () => 'https://exmo.me/',
  });
  K.register('finance', {
    id: 'poloniex-price', name: 'Poloniex (BTC/USDT price)', home: 'https://poloniex.com/', proxy: true,
    kw: 'poloniex:3 poloniex_price:3 poloniex_ticker:3',
    sample: 'poloniex price',
    url: () => 'https://api.poloniex.com/markets/BTC_USDT/price',
    list: d => [d],
    title: d => `${d.symbol} on Poloniex`,
    body: d => `Price ${d.price} · daily change ${d.dailyChange}`,
    link: () => 'https://poloniex.com/',
  });
  K.register('finance', {
    id: 'cex-ticker', name: 'CEX.IO (BTC/USD)', home: 'https://cex.io/', proxy: true,
    kw: 'cex_io:3 cex_price:3 cexio:3 cex_ticker:2',
    sample: 'cex price',
    url: () => 'https://cex.io/api/ticker/BTC/USD',
    list: d => [d],
    title: () => 'BTC/USD on CEX.IO',
    body: d => `Last ${d.last} · high ${d.high} · low ${d.low}`,
    link: () => 'https://cex.io/',
  });
  K.register('finance', {
    id: 'bitpanda-ticker', name: 'Bitpanda (price index)', home: 'https://www.bitpanda.com/',
    kw: 'bitpanda:3 bitpanda_price:3 bitpanda_ticker:3 gold_price_eur:2',
    sample: 'bitpanda price',
    url: () => 'https://api.bitpanda.com/v1/ticker',
    list: d => Object.entries(d).slice(0, 5),
    title: ([asset]) => `${asset} prices`,
    body: ([, quotes]) => `USD ${quotes.USD} · EUR ${quotes.EUR}`,
    link: () => 'https://www.bitpanda.com/',
  });
  K.register('finance', {
    id: 'nbp-gold', name: 'National Bank of Poland (gold price)', home: 'https://api.nbp.pl/',
    kw: 'gold_price:3 gold_rate:3 gold_prices_poland:3 nbp_gold:3 precious_metals:2',
    sample: 'gold price',
    url: () => 'https://api.nbp.pl/api/cenyzlota/?format=json',
    list: d => d,
    title: g => `Gold ${g.cena} PLN per gram`,
    body: g => g.data,
    link: () => 'https://api.nbp.pl/',
  });
  K.register('finance', {
    id: 'nbrb-rates', name: 'National Bank of Belarus (rates)', home: 'https://www.nbrb.by/',
    kw: 'belarus_rates:3 belarusian_ruble:3 nbrb:3 byn_exchange:3 belarus_currency:2',
    sample: 'belarus exchange rates',
    url: () => 'https://api.nbrb.by/exrates/rates?periodicity=0',
    list: d => d,
    title: r => `${r.Cur_Abbreviation} · ${r.Cur_Name}`,
    body: r => `${r.Cur_OfficialRate} BYN per ${r.Cur_Scale}`,
    link: () => 'https://www.nbrb.by/',
  });
  K.register('finance', {
    id: 'cnb-rates', name: 'Czech National Bank (daily rates)', home: 'https://www.cnb.cz/', proxy: true,
    kw: 'czech_rates:3 czech_koruna:3 cnb:3 czech_national_bank:3 czk_rates:3',
    sample: 'czech exchange rates',
    url: () => 'https://api.cnb.cz/cnbapi/exrates/daily?lang=EN',
    list: 'rates',
    title: r => `${r.currency} (${r.currencyCode})`,
    body: r => `${r.rate} CZK per ${r.amount} · ${r.country}`,
    link: () => 'https://www.cnb.cz/',
  });
})(Keyless);
