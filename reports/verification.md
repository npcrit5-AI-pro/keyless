# Verification report

Generated 2026-11-26 with `node scripts/verify.mjs`. Each source ran its sample query live (or was reused from the cache because its code is unchanged and it passed within the last 7 days).
A source passes when the query returns at least one item with a title and an http(s) link,
and, for direct sources, every request it makes is answered with a CORS allow-origin header.

**Result: 303 of 303 sources passed.**

## By category

| Category | Pass | Fail |
| --- | ---: | ---: |
| Books & reading | 6 | 0 |
| News & tech | 3 | 0 |
| Reference & encyclopedias | 10 | 0 |
| Language & words | 7 | 0 |
| Weather & climate | 13 | 0 |
| Earthquakes & hazards | 7 | 0 |
| Science & research | 19 | 0 |
| Space & astronomy | 12 | 0 |
| Geography & places | 12 | 0 |
| Finance & crypto | 45 | 0 |
| Food & drink | 7 | 0 |
| Animals & nature | 9 | 0 |
| Music | 5 | 0 |
| Movies & TV | 7 | 0 |
| Video games & board games | 19 | 0 |
| Sports | 9 | 0 |
| Health & medicine | 9 | 0 |
| Government & open data | 21 | 0 |
| Environment & climate data | 6 | 0 |
| Art & museums | 3 | 0 |
| Images & media | 6 | 0 |
| Internet & networking | 8 | 0 |
| Developer tools | 25 | 0 |
| Fun & trivia | 24 | 0 |
| Time & calendars | 7 | 0 |
| Travel & transport | 4 | 0 |

## All sources

| Result | Name | Id | Category | Access | Last verified | Detail |
| --- | --- | --- | --- | --- | --- | --- |
| PASS | Cat as a Service (cat pictures) | `cataas` | Animals & nature | direct | 2026-11-26 | 5 · Cat picture 0270ee2e |
| PASS | Cat facts (catfact.ninja) | `catfact` | Animals & nature | direct | 2026-11-26 | 5 · Unlike dogs, cats do not have a sweet tooth. Scientists believe this is due to a mutation in a key taste receptor. |
| PASS | Dog CEO (breed list) | `dog-breeds` | Animals & nature | direct | 2026-11-26 | 5 · Affenpinscher |
| PASS | Dog CEO | `dogceo` | Animals & nature | direct | 2026-11-26 | 1 · Random dog photo |
| PASS | GBIF Species | `gbif` | Animals & nature | direct | 2026-11-26 | 5 · Panthera leo |
| PASS | GBIF Occurrences | `gbif-occ` | Animals & nature | direct | 2026-11-26 | 5 · Panthera leo melanochaita (C.E.H.Smith, 1858) · South Africa |
| PASS | iNaturalist | `inaturalist` | Animals & nature | direct | 2026-11-26 | 5 · Red Fox (Vulpes vulpes) |
| PASS | RandomFox (fox pictures) | `randomfox` | Animals & nature | direct | 2026-11-26 | 1 · Random fox picture |
| PASS | The Cat API (images) | `thecatapi-images` | Animals & nature | direct | 2026-11-26 | 5 · Cat image 181 |
| PASS | Art Institute of Chicago | `artic` | Art & museums | direct | 2026-11-26 | 5 · Early Morning, Tarpon Springs |
| PASS | Met Museum Collection | `met` | Art & museums | direct | 2026-11-26 | 5 · Sunflowers |
| PASS | SMK (Statens Museum for Kunst) | `smk-art` | Art & museums | direct | 2026-11-26 | 5 · Rembrandts moder (Rembrandt's Mother) |
| PASS | Internet Archive | `archiveorg` | Books & reading | direct | 2026-11-26 | 5 · KSCO 1080 AM [AM 1080 KSCO] : November 27, 2019 09:00PM-10:00PM PST |
| PASS | Bible API | `bible` | Books & reading | direct | 2026-11-26 | 1 · John 3:16 |
| PASS | MangaDex (manga titles) | `mangadex` | Books & reading | proxy | 2026-11-26 | 5 · Renge to Naruto! |
| PASS | Open Library | `openlibrary` | Books & reading | direct | 2026-11-26 | 5 · The Hobbit (1937) |
| PASS | Open Library (authors) | `openlibrary-authors` | Books & reading | direct | 2026-11-26 | 5 · F. Tolkien |
| PASS | PoetryDB | `poetrydb` | Books & reading | direct | 2026-11-26 | 5 · A Lover's Complaint |
| PASS | Bundlephobia (npm bundle size) | `bundlephobia` | Developer tools | direct | 2026-11-26 | 1 · react@19.3.1 |
| PASS | cdnjs (JavaScript libraries) | `cdnjs-libraries` | Developer tools | direct | 2026-11-26 | 5 · jquery |
| PASS | crates.io | `crates` | Developer tools | direct | 2026-11-26 | 5 · serde@1.0.229 |
| PASS | DEV Community (articles) | `devto-articles` | Developer tools | direct | 2026-11-26 | 5 · JavaScript told me to buy 8 bags of concrete. I needed 7. |
| PASS | Docker Hub (image search) | `docker-hub` | Developer tools | proxy | 2026-11-26 | 5 · nginx |
| PASS | endoflife.date (release cycles) | `endoflife` | Developer tools | direct | 2026-11-26 | 5 · Nodejs 26 |
| PASS | GitHub Search | `github` | Developer tools | direct | 2026-11-26 | 5 · vercel/next.js |
| PASS | GitLab Public Projects | `gitlab` | Developer tools | direct | 2026-11-26 | 5 · gitlab-org/gitlab-runner |
| PASS | Hex.pm (Elixir and Erlang packages) | `hex-packages` | Developer tools | direct | 2026-11-26 | 5 · a2ui 0.3.1 |
| PASS | Have I Been Pwned (password range) | `hibp-range` | Developer tools | direct | 2026-11-26 | 5 · Hash suffix 0002EEFFB2CCA91812B5CC9956854E22BEB |
| PASS | HN Algolia (comments) | `hn-comments` | Developer tools | direct | 2026-11-26 | 5 · Here's a good write-up on the difference between postgres and MS SQL.http://www.pg-versus-ms.com/I&# |
| PASS | Hugging Face (model search) | `huggingface-models` | Developer tools | direct | 2026-11-26 | 5 · google-bert/bert-base-uncased |
| PASS | jsDelivr Package Stats | `jsdelivr` | Developer tools | direct | 2026-11-26 | 1 · react |
| PASS | JSONPlaceholder (fake REST posts) | `jsonplaceholder` | Developer tools | direct | 2026-11-26 | 5 · sunt aut facere repellat provident occaecati excepturi optio reprehenderit |
| PASS | Maven Central (Java libraries) | `maven-central` | Developer tools | proxy | 2026-11-26 | 5 · org.robolectric:junit |
| PASS | MDN Web Docs (search) | `mozilla-mdn` | Developer tools | proxy | 2026-11-26 | 5 · Fetch API |
| PASS | Node.js release index | `nodejs-releases` | Developer tools | direct | 2026-11-26 | 5 · Node.js v27.0.0-alpha.0.2.0 |
| PASS | npm Registry | `npm` | Developer tools | direct | 2026-11-26 | 5 · express@5.3.0 |
| PASS | npm downloads (weekly counts) | `npm-downloads` | Developer tools | direct | 2026-11-26 | 1 · react downloads (last week) |
| PASS | npms.io (npm package search) | `npms-search` | Developer tools | direct | 2026-11-26 | 5 · react-router@6.3.0 |
| PASS | Packagist (PHP) | `packagist` | Developer tools | proxy | 2026-11-26 | 5 · monolog/monolog |
| PASS | PyPI (pypi.org JSON) | `pypi` | Developer tools | proxy | 2026-11-26 | 1 · requests@2.34.2 |
| PASS | ReqRes (mock users) | `reqres` | Developer tools | direct | 2026-11-26 | 5 · Michael Lawson |
| PASS | RubyGems (gem search) | `rubygems-search` | Developer tools | proxy | 2026-11-26 | 5 · rails 8.1.4.1 |
| PASS | Stack Exchange (Stack Overflow) | `stackexchange` | Developer tools | direct | 2026-11-26 | 5 · How do I reverse a list or loop over it backwards? |
| PASS | EMSC Seismic Portal | `emsc` | Earthquakes & hazards | direct | 2026-11-26 | 5 · TARAPACA, CHILE |
| PASS | NASA EONET | `eonet` | Earthquakes & hazards | direct | 2026-11-26 | 5 · Wildfire Little Ridge, Highland, Virginia |
| PASS | GeoNet New Zealand | `geonet` | Earthquakes & hazards | direct | 2026-11-26 | 5 · 10 km north-west of Ruatoria |
| PASS | Open-Meteo Flood | `openmeteo-flood` | Earthquakes & hazards | direct | 2026-11-26 | 1 · River discharge · Berlin |
| PASS | UK Flood Monitoring | `ukflood` | Earthquakes & hazards | direct | 2026-11-26 | 5 · South Cornwall coast from Lizard Point to Gribbin Head excluding the Tidal Fal Estuary |
| PASS | USGS Earthquakes | `usgs` | Earthquakes & hazards | direct | 2026-11-26 | 5 · M 0.9 - 85 km NNW of Karluk, Alaska |
| PASS | USGS Volcano Hazards | `usgs-volcano` | Earthquakes & hazards | direct | 2026-11-26 | 5 · Adagdak |
| PASS | UK Carbon Intensity | `carbon-intensity` | Environment & climate data | direct | 2026-11-26 | 1 · UK grid carbon intensity |
| PASS | UK Generation Mix | `carbon-intensity-generation` | Environment & climate data | direct | 2026-11-26 | 1 · UK generation mix now |
| PASS | Energy-Charts (Fraunhofer ISE) | `energy-charts` | Environment & climate data | proxy | 2026-11-26 | 5 · Hydro pumped storage consumption |
| PASS | NOAA CO-OPS tide levels (San Francisco) | `noaa-tides` | Environment & climate data | direct | 2026-11-26 | 1 · 2026-11-26 19:00 UTC |
| PASS | Octopus Energy (UK tariffs) | `octopus-energy` | Environment & climate data | direct | 2026-11-26 | 5 · Agile Octopus |
| PASS | USGS water levels (river discharge) | `usgs-water` | Environment & climate data | direct | 2026-11-26 | 1 · POTOMAC RIVER NEAR WASH, DC LITTLE FALLS PUMP STA · discharge |
| PASS | Studio Ghibli API | `ghibli` | Movies & TV | direct | 2026-11-26 | 5 · Castle in the Sky (1986) |
| PASS | IMDb Suggestions | `imdb-suggest` | Movies & TV | proxy | 2026-11-26 | 5 · Inception (2010) |
| PASS | Kitsu (anime search) | `kitsu-anime` | Movies & TV | direct | 2026-11-26 | 5 · Naruto: Shippuuden |
| PASS | Shikimori (anime database) | `shikimori` | Movies & TV | direct | 2026-11-26 | 5 · Наруто |
| PASS | Star Wars API (characters) | `swapi` | Movies & TV | direct | 2026-11-26 | 1 · Luke Skywalker |
| PASS | TVmaze | `tvmaze` | Movies & TV | direct | 2026-11-26 | 5 · Breaking Bad (2008) |
| PASS | TVmaze Schedule | `tvmaze-schedule` | Movies & TV | direct | 2026-11-26 | 5 · Good Morning America · S2026E236 |
| PASS | Binance.US (price) | `binance-us-price` | Finance & crypto | direct | 2026-11-26 | 1 · BTCUSD on Binance.US |
| PASS | Bitfinex (BTC/USD) | `bitfinex-ticker` | Finance & crypto | proxy | 2026-11-26 | 1 · BTC/USD on Bitfinex |
| PASS | bitFlyer (BTC/JPY) | `bitflyer-ticker` | Finance & crypto | proxy | 2026-11-26 | 1 · BTC/JPY on bitFlyer |
| PASS | Bithumb (BTC/KRW) | `bithumb-ticker` | Finance & crypto | direct | 2026-11-26 | 1 · BTC/KRW on Bithumb |
| PASS | Bitpanda (price index) | `bitpanda-ticker` | Finance & crypto | direct | 2026-11-26 | 5 · XAU prices |
| PASS | Bitso (BTC/MXN) | `bitso-ticker` | Finance & crypto | proxy | 2026-11-26 | 1 · BTC/MXN on Bitso |
| PASS | Bitstamp (BTC/USD) | `bitstamp-ticker` | Finance & crypto | proxy | 2026-11-26 | 1 · BTC/USD on Bitstamp |
| PASS | Blockchain.com Stats | `blockchain-info` | Finance & crypto | direct | 2026-11-26 | 1 · Bitcoin network |
| PASS | Bank of Canada exchange rates | `boc-fx` | Finance & crypto | direct | 2026-11-26 | 5 · USD → CAD 1.4219 |
| PASS | Central Bank of Russia Rates (mirror) | `cbr` | Finance & crypto | proxy | 2026-11-26 | 5 · AUD · Австралийский доллар |
| PASS | CEX.IO (BTC/USD) | `cex-ticker` | Finance & crypto | proxy | 2026-11-26 | 1 · BTC/USD on CEX.IO |
| PASS | Czech National Bank (daily rates) | `cnb-rates` | Finance & crypto | proxy | 2026-11-26 | 5 · dollar (AUD) |
| PASS | Coinbase Spot Price | `coinbase` | Finance & crypto | direct | 2026-11-26 | 1 · BTC/USD spot |
| PASS | Coincheck (BTC/JPY) | `coincheck-ticker` | Finance & crypto | proxy | 2026-11-26 | 1 · BTC/JPY on Coincheck |
| PASS | CoinGecko | `coingecko` | Finance & crypto | direct | 2026-11-26 | 1 · Bitcoin · $60,462 |
| PASS | CoinLore (top coins) | `coinlore-tickers` | Finance & crypto | direct | 2026-11-26 | 5 · Bitcoin |
| PASS | CoinPaprika | `coinpaprika` | Finance & crypto | direct | 2026-11-26 | 5 · Ethereum |
| PASS | Frankfurter (ECB rates) | `currency` | Finance & crypto | direct | 2026-11-26 | 1 · 100 USD = 91.12 EUR |
| PASS | DefiLlama (blockchains by TVL) | `defillama-chains` | Finance & crypto | direct | 2026-11-26 | 5 · Ethereum |
| PASS | DefiLlama (top DeFi protocols) | `defillama-protocols` | Finance & crypto | direct | 2026-11-26 | 5 · Binance CEX |
| PASS | DEX Screener (token pairs) | `dexscreener-search` | Finance & crypto | direct | 2026-11-26 | 5 · PEPE/WETH on ethereum |
| PASS | ECB Data Portal | `ecbstats` | Finance & crypto | direct | 2026-11-26 | 1 · ECB EUR/USD reference |
| PASS | Open Exchange Rates (ER-API) | `erapi` | Finance & crypto | direct | 2026-11-26 | 1 · Exchange rates · base USD |
| PASS | EXMO (crypto tickers) | `exmo-ticker` | Finance & crypto | direct | 2026-11-26 | 5 · ADA_USDC on EXMO |
| PASS | Currency API (200+ currencies) | `fawaz-currency` | Finance & crypto | direct | 2026-11-26 | 1 · Currency rates · base USD |
| PASS | Crypto Fear & Greed Index | `fear-greed` | Finance & crypto | direct | 2026-11-26 | 5 · Extreme Fear · 11/100 |
| PASS | Gate.io (BTC/USDT) | `gateio-tickers` | Finance & crypto | direct | 2026-11-26 | 1 · BTC_USDT |
| PASS | Gemini exchange (BTC/USD) | `gemini-ticker` | Finance & crypto | direct | 2026-11-26 | 1 · BTC/USD on Gemini |
| PASS | GLEIF LEI Register | `gleif` | Finance & crypto | direct | 2026-11-26 | 5 · APPLE TREE |
| PASS | HitBTC (BTC/USD) | `hitbtc-ticker` | Finance & crypto | direct | 2026-11-26 | 1 · BTC/USD on HitBTC |
| PASS | Huobi (BTC/USDT) | `huobi-ticker` | Finance & crypto | direct | 2026-11-26 | 1 · BTC/USDT on Huobi |
| PASS | Kraken Public Ticker | `kraken` | Finance & crypto | direct | 2026-11-26 | 1 · Kraken · XBT/USD |
| PASS | KuCoin (BTC-USDT) | `kucoin-price` | Finance & crypto | proxy | 2026-11-26 | 1 · BTC-USDT on KuCoin |
| PASS | mempool.space Fees | `mempool` | Finance & crypto | direct | 2026-11-26 | 1 · Bitcoin recommended fees |
| PASS | MEXC (BTC-USDT price) | `mexc-price` | Finance & crypto | proxy | 2026-11-26 | 1 · BTCUSDT on MEXC |
| PASS | National Bank of Poland Rates | `nbp` | Finance & crypto | direct | 2026-11-26 | 1 · NBP · USD/PLN |
| PASS | National Bank of Poland (gold price) | `nbp-gold` | Finance & crypto | direct | 2026-11-26 | 1 · Gold 464.88 PLN per gram |
| PASS | National Bank of Belarus (rates) | `nbrb-rates` | Finance & crypto | direct | 2026-11-26 | 5 · AUD · Австралийский доллар |
| PASS | OKX (BTC-USDT) | `okx-ticker` | Finance & crypto | direct | 2026-11-26 | 1 · BTC-USDT |
| PASS | Poloniex (BTC/USDT price) | `poloniex-price` | Finance & crypto | proxy | 2026-11-26 | 1 · BTC_USDT on Poloniex |
| PASS | US Treasury Fiscal Data | `treasury` | Finance & crypto | direct | 2026-11-26 | 5 · Debt to the penny · 2026-11-24 |
| PASS | Upbit (BTC/KRW) | `upbit-ticker` | Finance & crypto | direct | 2026-11-26 | 1 · KRW-BTC |
| PASS | World Bank Indicators | `worldbank` | Finance & crypto | direct | 2026-11-26 | 5 · United States · GDP 2025 |
| PASS | Yahoo Finance chart (stock quote) | `yahoo-chart` | Finance & crypto | proxy | 2026-11-26 | 1 · AAPL · USD |
| PASS | Zaif (BTC/JPY) | `zaif-ticker` | Finance & crypto | proxy | 2026-11-26 | 1 · BTC/JPY on Zaif |
| PASS | CocktailDB | `cocktail` | Food & drink | direct | 2026-11-26 | 4 · Mojito |
| PASS | Fruityvice | `fruityvice` | Food & drink | proxy | 2026-11-26 | 1 · Banana |
| PASS | Open Beauty Facts | `openbeautyfacts` | Food & drink | direct | 2026-11-26 | 5 · Coconut Milk |
| PASS | Open Food Facts (barcode) | `openfacts-barcode` | Food & drink | direct | 2026-11-26 | 1 · Nutella |
| PASS | TheMealDB | `themealdb` | Food & drink | direct | 2026-11-26 | 5 · Chicken Handi |
| PASS | TheMealDB (random) | `themealdb-random` | Food & drink | direct | 2026-11-26 | 1 · Saskatoon Pie |
| PASS | UK Food Standards Ratings | `ukfood` | Food & drink | direct | 2026-11-26 | 5 · Tesco |
| PASS | Advice Slip | `advice` | Fun & trivia | direct | 2026-11-26 | 1 · Advice #127 |
| PASS | Agify (age guess from a name) | `agify` | Fun & trivia | direct | 2026-11-26 | 1 · Michael |
| PASS | Bored API (activities) | `bored` | Fun & trivia | proxy | 2026-11-26 | 1 · Volunteer at your local food bank |
| PASS | Chuck Norris Jokes | `chucknorris` | Fun & trivia | direct | 2026-11-26 | 1 · If you somehow survive a roundhouse kick from Chuck Norris, you'd still go to jail for head butting his foot. |
| PASS | FavQs (quote of the day) | `favqs-qotd` | Fun & trivia | proxy | 2026-11-26 | 1 · A work of art is the unique result of a unique temperament. |
| PASS | Genderize (gender guess from a name) | `genderize` | Fun & trivia | direct | 2026-11-26 | 1 · Peter |
| PASS | Hipsum (placeholder text) | `hipsum` | Fun & trivia | direct | 2026-11-26 | 1 · Placeholder paragraph |
| PASS | icanhazdadjoke (dad jokes) | `icanhazdadjoke` | Fun & trivia | direct | 2026-11-26 | 1 · I thought my wife was joking when she said she'd leave me if I didn't stop signing "I'm A Believer"... Then I saw her face. |
| PASS | An API of Ice and Fire (Game of Thrones) | `ice-and-fire` | Fun & trivia | direct | 2026-11-26 | 1 · Jon Snow |
| PASS | JokeAPI | `jokes` | Fun & trivia | direct | 2026-11-26 | 3 · Why couldn't the skeleton go to the Christmas party? |
| PASS | Kanye Rest (random quote) | `kanye-quotes` | Fun & trivia | direct | 2026-11-26 | 1 · The thought police want to suppress freedom of thought |
| PASS | Nationalize (nationality guess) | `nationalize` | Fun & trivia | direct | 2026-11-26 | 5 · Likely country: US |
| PASS | Potter API (Harry Potter characters) | `potter-api` | Fun & trivia | direct | 2026-11-26 | 5 · Harry James Potter |
| PASS | Quotable (random quotes) | `quotable-kurokeita` | Fun & trivia | direct | 2026-11-26 | 1 · Look up at the stars and not down at your feet. Try to make sense of what you see, and wonder about what makes the universe exist. Be curious. |
| PASS | Random User (fake profiles) | `randomuser` | Fun & trivia | direct | 2026-11-26 | 1 · Pilar Vásquez |
| PASS | Rick and Morty API (characters) | `rick-and-morty` | Fun & trivia | direct | 2026-11-26 | 4 · Rick Sanchez |
| PASS | The Simpsons API | `simpsons` | Fun & trivia | direct | 2026-11-26 | 5 · Homer Simpson |
| PASS | Taylor Swift API (lyrics) | `taylor-swift-quotes` | Fun & trivia | direct | 2026-11-26 | 1 · I made you my temple, my mural, my sky. Now I'm begging for footnotes in the story of your life / Drawing hearts in the byline always taking up too much space or time |
| PASS | Thrones API (Game of Thrones cast) | `thrones-characters` | Fun & trivia | direct | 2026-11-26 | 1 · Daenerys Targaryen |
| PASS | Open Trivia DB | `trivia-opentdb` | Fun & trivia | direct | 2026-11-26 | 3 · The key of sharps does the key of G# minor contain? |
| PASS | The Trivia API | `trivia-v2` | Fun & trivia | direct | 2026-11-26 | 5 · What is Venereology the study of? |
| PASS | Type.fit quotes | `typefit-quotes` | Fun & trivia | proxy | 2026-11-26 | 5 · Genius is one percent inspiration and ninety-nine percent perspiration. |
| PASS | Useless Facts | `uselessfacts` | Fun & trivia | direct | 2026-11-26 | 1 · There were always 56 curls in Shirley Temple`s hair. |
| PASS | ZenQuotes | `zenquotes` | Fun & trivia | proxy | 2026-11-26 | 1 · You cannot control the behavior of others, but you can always choose how you respond to it. |
| PASS | CheapShark Deals | `cheapshark` | Video games & board games | direct | 2026-11-26 | 5 · Bread and Fred |
| PASS | CheapShark Game Search | `cheapshark-search` | Video games & board games | direct | 2026-11-26 | 5 · Portal |
| PASS | Chess.com (player profile) | `chesscom-player` | Video games & board games | direct | 2026-11-26 | 1 · hikaru |
| PASS | Digi-API (Digimon) | `digimon` | Video games & board games | direct | 2026-11-26 | 5 · Agumon |
| PASS | Elden Ring API (bosses) | `eldenring-bosses` | Video games & board games | direct | 2026-11-26 | 5 · Abductor Virgins |
| PASS | Fortnite-API (news) | `fortnite-news` | Video games & board games | direct | 2026-11-26 | 5 · Golden Week + Community Day |
| PASS | Free-to-Play Games | `freetogame` | Video games & board games | direct | 2026-11-26 | 5 · Overwatch |
| PASS | GamerPower (free game giveaways) | `gamerpower` | Video games & board games | direct | 2026-11-26 | 5 · A Tiny Sticker Tale (Mobile) Giveaway |
| PASS | Lichess (player profile) | `lichess-user` | Video games & board games | direct | 2026-11-26 | 1 · DrNykterstein |
| PASS | Mojang (Minecraft username lookup) | `mojang-profile` | Video games & board games | proxy | 2026-11-26 | 1 · Notch |
| PASS | OpenDota (Dota 2 heroes) | `opendota-heroes` | Video games & board games | direct | 2026-11-26 | 5 · Anti-Mage |
| PASS | Overfast API (Overwatch heroes) | `overwatch-heroes` | Video games & board games | direct | 2026-11-26 | 5 · Ana |
| PASS | PokéAPI | `pokeapi` | Video games & board games | direct | 2026-11-26 | 1 · Pikachu |
| PASS | Pokémon TCG (cards) | `pokemontcg` | Video games & board games | direct | 2026-11-26 | 5 · Pikachu |
| PASS | Scryfall (Magic: The Gathering cards) | `scryfall-cards` | Video games & board games | direct | 2026-11-26 | 1 · Lightning Bolt |
| PASS | speedrun.com (games) | `speedrun` | Video games & board games | direct | 2026-11-26 | 5 · Cat Mario |
| PASS | Steam store search | `steam-store` | Video games & board games | proxy | 2026-11-26 | 5 · Portal 2 |
| PASS | Warframe Stats | `warframe` | Video games & board games | direct | 2026-11-26 | 5 · Amesha |
| PASS | YGOPRODeck (Yu-Gi-Oh! cards) | `ygoprodeck` | Video games & board games | direct | 2026-11-26 | 5 · Dark Magician |
| PASS | Base Adresse Nationale (France addresses) | `adresse-gouv` | Geography & places | direct | 2026-11-26 | 5 · Port du Louvre 75001 Paris |
| PASS | BigDataCloud Reverse Geocode | `bigdatacloud` | Geography & places | direct | 2026-11-26 | 1 · Santa Maria Maior, Portugal |
| PASS | country.is (IP to country) | `country-is` | Geography & places | direct | 2026-11-26 | 1 · 8.8.8.8 is in US |
| PASS | Entur geocoder (Norway places) | `entur-geocoder` | Geography & places | direct | 2026-11-26 | 5 · Bergen sentrum, Bergen |
| PASS | FlagCDN (country codes) | `flagcdn` | Geography & places | direct | 2026-11-26 | 5 · AD · Andorra |
| PASS | geo.api.gouv.fr (French communes) | `geo-gouv-communes` | Geography & places | direct | 2026-11-26 | 5 · Paris |
| PASS | Geogratis (Canadian place names) | `geogratis` | Geography & places | direct | 2026-11-26 | 5 · Ottawa, Carleton; Russell, Ontario (City) |
| PASS | ipwho.is | `ipwhois` | Geography & places | direct | 2026-11-26 | 1 · 1.1.1.1 · Brisbane, Australia |
| PASS | OpenStreetMap Nominatim | `nominatim` | Geography & places | proxy | 2026-11-26 | 5 · Lisboa, Portugal |
| PASS | Open-Elevation | `open-elevation` | Geography & places | direct | 2026-11-26 | 1 · Zurich · 435 m |
| PASS | Open-Meteo Geocoding | `openmeteo-geo` | Geography & places | direct | 2026-11-26 | 5 · Lisbon, Portugal |
| PASS | Zippopotam (US ZIP codes) | `zippopotam-us` | Geography & places | direct | 2026-11-26 | 1 · Beverly Hills, CA |
| PASS | Austin 311 service requests | `austin-311` | Government & open data | direct | 2026-11-26 | 5 · DSD - Outdoor Commercial Venue Music Complaint |
| PASS | City of Chicago Crime Reports | `chicago-crimes` | Government & open data | direct | 2026-11-26 | 5 · STALKING |
| PASS | US Congress Legislators | `congress-legislators` | Government & open data | direct | 2026-11-26 | 5 · Maria Cantwell |
| PASS | data.gouv.fr (French open data) | `data-gouv-fr` | Government & open data | direct | 2026-11-26 | 2 · Datasets Opéra - Activités maisons d'opéra - Réunion des Opéras de France |
| PASS | data.gov.au (CKAN) | `data-gov-au` | Government & open data | direct | 2026-11-26 | 5 · Australia's Maritime Jurisdiction around Australia |
| PASS | EU Open Data Portal | `eu-open-data` | Government & open data | direct | 2026-11-26 | 5 · England Population - Count |
| PASS | Eurostat inflation (Germany, HICP) | `eurostat` | Government & open data | direct | 2026-11-26 | 5 · Germany inflation · 2025-12 |
| PASS | GOV.UK Search API | `govuk-search` | Government & open data | direct | 2026-11-26 | 5 · Apply for your first provisional driving licence |
| PASS | IBGE (Brazilian states) | `ibge-states` | Government & open data | direct | 2026-11-26 | 5 · Rondônia |
| PASS | LAPD crime records | `lacity-crime` | Government & open data | direct | 2026-11-26 | 5 · DOCUMENT FORGERY / STOLEN FELONY |
| PASS | NYC 311 Service Requests | `nyc-311` | Government & open data | direct | 2026-11-26 | 5 · Illegal Parking |
| PASS | NYC motor vehicle collisions | `nyc-collisions` | Government & open data | direct | 2026-11-26 | 5 · Collision in QUEENS · 1 injured |
| PASS | Open Government Canada (CKAN) | `open-canada` | Government & open data | direct | 2026-11-26 | 5 · Reconstructed river water temperature dataset over Canada 1980-2018. |
| PASS | OpenDataSoft public catalog | `opendatasoft-catalog` | Government & open data | direct | 2026-11-26 | 5 · Arrondissements départementaux - France |
| PASS | ProPublica Nonprofit Explorer | `propublica-nonprofits` | Government & open data | proxy | 2026-11-26 | 5 · Red Cross Civitans |
| PASS | San Francisco police incidents | `sfgov-incidents` | Government & open data | direct | 2026-11-26 | 5 · Suspicious Occurrence |
| PASS | UK Parliament Members | `uk-parliament` | Government & open data | direct | 2026-11-26 | 5 · Alan Johnson |
| PASS | UK Police Crime Data | `uk-police` | Government & open data | direct | 2026-11-26 | 5 · Crime data · 2026-09 |
| PASS | UK Parliament Bills | `ukgov-bills` | Government & open data | proxy | 2026-11-26 | 5 · Climate and Ecology Bill |
| PASS | postcodes.io (UK postcodes) | `ukgov-postcode` | Government & open data | direct | 2026-11-26 | 1 · SW1A 1AA |
| PASS | USAspending.gov agencies | `usaspending` | Government & open data | direct | 2026-11-26 | 5 · 400 Years of African-American History Commission |
| PASS | NLM Clinical Tables (conditions) | `clinicaltables-conditions` | Health & medicine | direct | 2026-11-26 | 5 · Diabetes mellitus (DM) |
| PASS | ClinicalTrials.gov | `clinicaltrials` | Health & medicine | direct | 2026-11-26 | 5 · A Survey To Elicit The Relationship Between Literacy And Glycemic Control In Pediatric Diabetes |
| PASS | disease.sh (COVID-19 stats) | `covid-disease-sh` | Health & medicine | direct | 2026-11-26 | 1 · COVID-19 · Germany |
| PASS | MedlinePlus Connect | `medlineplus` | Health & medicine | proxy | 2026-11-26 | 5 · Diabetes |
| PASS | RxNorm (NLM) | `nih-rxnorm` | Health & medicine | direct | 2026-11-26 | 5 · {100 (acetaminophen 250 MG / aspirin 250 MG / caffeine 65 MG Oral Tablet [Excedrin]) / 24 (acetaminophen 250 MG / aspirin 250 MG / diphenhydramine citrate 38 MG Oral Tablet [Excedrin PM Triple Action]) } Pack [Excedrin PM Triple Action Caplets and Excedrin Extra Strength Pain Reliever] |
| PASS | openFDA Device Events | `openfda-device` | Health & medicine | direct | 2026-11-26 | 5 · ELECTRODE, PACEMAKER, PERMANENT |
| PASS | openFDA Drug Labels | `openfda-drug` | Health & medicine | direct | 2026-11-26 | 5 · Ibuprofen Dye Free |
| PASS | openFDA Food Recalls | `openfda-recall` | Health & medicine | direct | 2026-11-26 | 5 · Ground Up Nut Butter Cups filled with Almond & Cashew Butter Dark Chocolate Two Pack. Net |
| PASS | wger (exercise database) | `wger` | Health & medicine | direct | 2026-11-26 | 5 · 2 Handed Kettlebell Swing |
| PASS | Cloudflare DNS-over-HTTPS | `cloudflare-dns` | Internet & networking | direct | 2026-11-26 | 2 · example.com → 104.20.23.154 |
| PASS | Common Crawl index | `commoncrawl` | Internet & networking | direct | 2026-11-26 | 5 · November 2026 Index |
| PASS | geolocation-db.com (my IP) | `geolocation-db` | Internet & networking | direct | 2026-11-26 | 1 · 98.88.87.70 · Seattle, United States |
| PASS | Google Public DNS | `google-dns` | Internet & networking | direct | 2026-11-26 | 5 · gmail.com MX |
| PASS | httpbin | `httpbin` | Internet & networking | direct | 2026-11-26 | 1 · Your request, echoed |
| PASS | ipify (my public IP) | `ipify` | Internet & networking | direct | 2026-11-26 | 1 · Your public IP: 98.88.87.70 |
| PASS | RDAP (domain registration) | `rdap` | Internet & networking | direct | 2026-11-26 | 1 · EXAMPLE.COM |
| PASS | Wayback Machine (snapshots) | `wayback-cdx` | Internet & networking | proxy | 2026-11-26 | 5 · http://example.com:80/ |
| PASS | Datamuse | `datamuse` | Language & words | proxy | 2026-11-26 | 1 · happy |
| PASS | LanguageTool | `languagetool` | Language & words | direct | 2026-11-26 | 2 · This sentence does not start with an uppercase letter. |
| PASS | LanguageTool (supported languages) | `languagetool-languages` | Language & words | direct | 2026-11-26 | 5 · Arabic |
| PASS | MyMemory Translation | `mymemory` | Language & words | direct | 2026-11-26 | 1 · bonjour |
| PASS | Tatoeba (example sentences) | `tatoeba` | Language & words | proxy | 2026-11-26 | 5 · Hello |
| PASS | Urban Dictionary | `urbandictionary` | Language & words | direct | 2026-11-26 | 5 · Yeet |
| PASS | Wiktionary | `wiktionary` | Language & words | direct | 2026-11-26 | 1 · serendipity · Noun |
| PASS | Wikimedia Commons | `commons` | Images & media | direct | 2026-11-26 | 5 · Lightning striking the Eiffel Tower - NOAA.jpg |
| PASS | DiceBear avatars | `dicebear` | Images & media | proxy | 2026-11-26 | 1 · Avatar · frederick |
| PASS | Iconify (icon search) | `iconify` | Images & media | direct | 2026-11-26 | 5 · material-symbols:home |
| PASS | Imgflip meme templates | `imgflip` | Images & media | direct | 2026-11-26 | 5 · Drake Hotline Bling |
| PASS | Lorem Picsum | `picsum` | Images & media | direct | 2026-11-26 | 5 · Photo by Alejandro Escamilla |
| PASS | Podcast Index (iTunes podcasts) | `podcast-search` | Images & media | direct | 2026-11-26 | 5 · Notnerd Podcast: Tech Better |
| PASS | Deezer Search | `deezer` | Music | proxy | 2026-11-26 | 5 · Starboy · The Weeknd |
| PASS | Apple iTunes Search | `itunes` | Music | direct | 2026-11-26 | 4 · Bohemian Rhapsody · Queen |
| PASS | ListenBrainz (user search) | `listenbrainz` | Music | direct | 2026-11-26 | 5 · _rob_ |
| PASS | LRCLIB (synced lyrics) | `lrclib` | Music | direct | 2026-11-26 | 5 · YELLOW · Yellow Generation |
| PASS | Radio Browser | `radiobrowser` | Music | direct | 2026-11-26 | 5 · 101 SMOOTH JAZZ |
| PASS | Hacker News (Algolia) | `hackernews` | News & tech | direct | 2026-11-26 | 5 · Is Firefox under performing because of its Rust powered engine, Servo? |
| PASS | Hacker News (Firebase top stories) | `hn-firebase-top` | News & tech | direct | 2026-11-26 | 5 · AMD Specific Patches for Llama.cpp |
| PASS | Lobsters | `lobsters` | News & tech | proxy | 2026-11-26 | 5 · Slow Ubuntu security response times |
| PASS | Al Quran Cloud (ayah lookup) | `alquran` | Reference & encyclopedias | direct | 2026-11-26 | 1 · بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ |
| PASS | Nobel Prize laureates | `nobel` | Reference & encyclopedias | direct | 2026-11-26 | 3 · Irène Joliot-Curie |
| PASS | Wikidata | `wikidata` | Reference & encyclopedias | direct | 2026-11-26 | 5 · Lisbon |
| PASS | Wikipedia | `wikipedia` | Reference & encyclopedias | direct | 2026-11-26 | 5 · Marie Curie |
| PASS | Wikipedia (German summary) | `wikipedia-de` | Reference & encyclopedias | direct | 2026-11-26 | 1 · Berlin |
| PASS | Wikipedia (Spanish summary) | `wikipedia-es` | Reference & encyclopedias | direct | 2026-11-26 | 1 · Madrid |
| PASS | Wikipédia (French summary) | `wikipedia-fr` | Reference & encyclopedias | direct | 2026-11-26 | 1 · Paris |
| PASS | Wikipedia (Italian summary) | `wikipedia-it` | Reference & encyclopedias | direct | 2026-11-26 | 1 · Roma |
| PASS | Wikipedia (Japanese summary) | `wikipedia-ja` | Reference & encyclopedias | direct | 2026-11-26 | 1 · 東京 |
| PASS | Wikipédia (Portuguese summary) | `wikipedia-pt` | Reference & encyclopedias | direct | 2026-11-26 | 1 · Lisboa |
| PASS | bioRxiv (recent preprints) | `biorxiv` | Science & research | direct | 2026-11-26 | 5 · An open-source semi-automated workflow for multi-omics sample extraction |
| PASS | ChEMBL | `chembl` | Science & research | direct | 2026-11-26 | 5 · ASPIRIN |
| PASS | Crossref | `crossref` | Science & research | direct | 2026-11-26 | 5 · Machine learning with sklearn |
| PASS | DataCite (DOI metadata) | `datacite` | Science & research | direct | 2026-11-26 | 5 · Future Energy Systems: Interdisciplinary Solutions in a Climate Change Context |
| PASS | Ensembl Genes | `ensembl` | Science & research | direct | 2026-11-26 | 1 · BRCA2 |
| PASS | figshare (research data) | `figshare` | Science & research | direct | 2026-11-26 | 5 · Perceived accessibility and affordability of medications for focusing on digitally active population in Jordan |
| PASS | INSPIRE-HEP | `inspire` | Science & research | direct | 2026-11-26 | 5 · Boson-Fermion and Boson-Boson Scattering in a Yang-Mills Theory at High-Energy: Sixth Order Perturbation Theory |
| PASS | InterPro (protein families) | `interpro` | Science & research | direct | 2026-11-26 | 5 · Phosphofructokinase domain |
| PASS | Newton Math Solver | `newton` | Science & research | direct | 2026-11-26 | 1 · derive(x^2) |
| PASS | OpenAIRE (research outputs) | `openaire` | Science & research | direct | 2026-11-26 | 5 · Climate Research |
| PASS | PubChem | `pubchem` | Science & research | direct | 2026-11-26 | 1 · Aspirin |
| PASS | PubMed (NCBI) | `pubmed` | Science & research | direct | 2026-11-26 | 5 · Precision/Locus-Selective G-Quadruplex Stabilization as the Next Medicinal Chemistry Challenge. |
| PASS | QuickGO Gene Ontology | `quickgo` | Science & research | direct | 2026-11-26 | 5 · execution phase of apoptosis |
| PASS | RCSB Protein Data Bank | `rcsb` | Science & research | direct | 2026-11-26 | 1 · THE CRYSTAL STRUCTURE OF HUMAN DEOXYHAEMOGLOBIN AT 1.74 ANGSTROMS RESOLUTION |
| PASS | Reactome (biological pathways) | `reactome` | Science & research | direct | 2026-11-26 | 5 · Insulin |
| PASS | ROR Research Organizations | `ror` | Science & research | direct | 2026-11-26 | 5 · International Tourism Institute |
| PASS | UniProt | `uniprot` | Science & research | direct | 2026-11-26 | 5 · Insulin |
| PASS | Wellcome Collection works | `wellcome` | Science & research | direct | 2026-11-26 | 5 · Plague : how to recognise, prevent and treat plague / by James Cantlie. |
| PASS | Zenodo | `zenodo` | Science & research | direct | 2026-11-26 | 5 · ComFaceID_Class_Model |
| PASS | CelesTrak Orbital Elements | `celestrak` | Space & astronomy | direct | 2026-11-26 | 1 · ISS (ZARYA) |
| PASS | NASA Exoplanet Archive | `exoplanets` | Space & astronomy | proxy | 2026-11-26 | 5 · TOI-6647 b |
| PASS | NASA JPL Close Approaches | `jpl-cad` | Space & astronomy | proxy | 2026-11-26 | 5 · Asteroid 2026 VQ19 close approach |
| PASS | NASA JPL fireball events | `jpl-fireballs` | Space & astronomy | proxy | 2026-11-26 | 5 · Fireball 2026-10-04 03:14:45 |
| PASS | NASA JPL Small-Body Database | `jpl-sbdb` | Space & astronomy | proxy | 2026-11-26 | 1 · 99942 Apophis (2004 MN4) |
| PASS | NASA JPL Sentry (impact risk) | `jpl-sentry` | Space & astronomy | proxy | 2026-11-26 | 5 · Object 2011 TO |
| PASS | Launch Library 2 | `launchlibrary` | Space & astronomy | direct | 2026-11-26 | 5 · Long March 2D / Yaogan 49 Group 01 |
| PASS | NASA Image and Video Library | `nasaimages` | Space & astronomy | direct | 2026-11-26 | 5 · NASA Dedicates Martian Landmarks To Apollo 1 Crew |
| PASS | Spaceflight News API | `spaceflightnews` | Space & astronomy | direct | 2026-11-26 | 5 · The ‘bare-knuckled’ future of life in space with Tim Marshall |
| PASS | Sunrise Sunset | `sunrise` | Space & astronomy | direct | 2026-11-26 | 1 · Sun times · Lisbon |
| PASS | NOAA Space Weather Scales | `swpc` | Space & astronomy | direct | 2026-11-26 | 5 · Space weather 2026-11-26 |
| PASS | Where the ISS at? | `whereiss` | Space & astronomy | direct | 2026-11-26 | 1 · International Space Station |
| PASS | ESPN Scoreboard (MLB) | `espn-mlb` | Sports | direct | 2026-11-26 | 1 · Milwaukee Brewers at Tampa Bay Rays |
| PASS | ESPN Scoreboard (NBA) | `espn-nba` | Sports | direct | 2026-11-26 | 5 · Miami Heat at New York Knicks |
| PASS | ESPN Scoreboard (NHL) | `espn-nhl` | Sports | direct | 2026-11-26 | 5 · Toronto Maple Leafs at Boston Bruins |
| PASS | ESPN Scoreboard (NFL) | `espn-scoreboard` | Sports | direct | 2026-11-26 | 5 · Chicago Bears at Detroit Lions |
| PASS | ESPN Scoreboard (Premier League) | `espn-soccer` | Sports | direct | 2026-11-26 | 1 · Chelsea at Nottingham Forest |
| PASS | Jolpica F1 (Ergast successor) | `jolpica-f1` | Sports | direct | 2026-11-26 | 5 · 1. Andrea Kimi Antonelli |
| PASS | MLB Stats API | `mlb-stats` | Sports | direct | 2026-11-26 | 5 · Rays |
| PASS | NHL Stats API | `nhl-stats` | Sports | proxy | 2026-11-26 | 5 · Carolina Hurricanes |
| PASS | OpenLigaDB (Bundesliga matches) | `openligadb-bundesliga` | Sports | direct | 2026-11-26 | 5 · SV Werder Bremen vs Borussia Mönchengladbach |
| PASS | Aladhan (prayer times) | `aladhan` | Time & calendars | direct | 2026-11-26 | 5 · Fajr · 05:56 local time |
| PASS | Hebcal (Hebrew calendar) | `hebcal` | Time & calendars | direct | 2026-11-26 | 1 · 16 Kislev 5787 |
| PASS | Kayaposoft (public holidays) | `kayaposoft-holidays` | Time & calendars | direct | 2026-11-26 | 1 · Juneteenth National Independence Day |
| PASS | Nager.Date Country List | `nager-countries` | Time & calendars | direct | 2026-11-26 | 5 · Andorra |
| PASS | Nager.Date Public Holidays | `nager-holidays` | Time & calendars | direct | 2026-11-26 | 5 · Neujahr |
| PASS | OpenHolidays (country holidays) | `openholidays` | Time & calendars | direct | 2026-11-26 | 5 · Andorra |
| PASS | timeapi.io (time zones) | `timeapi-io` | Time & calendars | direct | 2026-11-26 | 1 · Europe/Berlin · 20:06 |
| PASS | NHTSA vehicle makes | `nhtsa-makes` | Travel & transport | direct | 2026-11-26 | 5 · ASTON MARTIN |
| PASS | Swiss public transport (opendata.ch) | `swiss-transport` | Travel & transport | direct | 2026-11-26 | 5 · Zürich HB |
| PASS | Transport for London (tube status) | `tfl` | Travel & transport | direct | 2026-11-26 | 5 · Bakerloo line |
| PASS | Wikivoyage (travel guides) | `wikivoyage` | Travel & transport | direct | 2026-11-26 | 1 · Paris |
| PASS | 7Timer! Civil Forecast | `7timer` | Weather & climate | proxy | 2026-11-26 | 1 · Madrid · 7Timer |
| PASS | Aviation Weather METAR | `aviation-metar` | Weather & climate | proxy | 2026-11-26 | 1 · KJFK · New York/JF Kennedy Intl, NY, US |
| PASS | Bright Sky (DWD, Germany) | `brightsky-dwd` | Weather & climate | direct | 2026-11-26 | 1 · Berlin · dry · -1.9°C |
| PASS | IPMA (Portugal daily forecast) | `ipma-forecast` | Weather & climate | direct | 2026-11-26 | 5 · 2026-11-26 |
| PASS | MET Norway Locationforecast | `metno` | Weather & climate | direct | 2026-11-26 | 1 · Oslo · MET Norway |
| PASS | US National Weather Service | `nws` | Weather & climate | direct | 2026-11-26 | 1 · Chicago · Thanksgiving Day |
| PASS | NWS Active Alerts (California) | `nws-alerts` | Weather & climate | direct | 2026-11-26 | 5 · Dense Fog Advisory |
| PASS | Open-Meteo Air Quality | `openmeteo-air` | Weather & climate | direct | 2026-11-26 | 1 · Air quality · Berlin |
| PASS | Open-Meteo Historical | `openmeteo-archive` | Weather & climate | direct | 2026-11-26 | 3 · 2024-07-01 · Berlin |
| PASS | Open-Meteo Climate Projections | `openmeteo-climate` | Weather & climate | direct | 2026-11-26 | 3 · 2030-01-01 · Berlin (projection) |
| PASS | Open-Meteo Marine | `openmeteo-marine` | Weather & climate | direct | 2026-11-26 | 1 · Waves · Biarritz |
| PASS | Open-Meteo Forecast | `weather` | Weather & climate | direct | 2026-11-26 | 1 · Lisbon, Portugal |
| PASS | wttr.in | `wttr` | Weather & climate | direct | 2026-11-26 | 1 · Madrid · Partly Cloudy |
