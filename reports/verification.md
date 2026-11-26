# Verification report

Run on 2026-11-26 with `node scripts/verify.mjs`. Each source ran its sample query live.
A source passes when the query returns at least one item with a title and an http(s) link,
and, for direct sources, every request it makes is answered with a CORS allow-origin header.

**Result: 192 of 192 sources passed.**

## By category

| Category | Pass | Fail |
| --- | ---: | ---: |
| Books & reading | 4 | 0 |
| News & tech | 2 | 0 |
| Reference & encyclopedias | 3 | 0 |
| Language & words | 5 | 0 |
| Weather & climate | 10 | 0 |
| Earthquakes & hazards | 7 | 0 |
| Science & research | 13 | 0 |
| Space & astronomy | 10 | 0 |
| Geography & places | 6 | 0 |
| Finance & crypto | 17 | 0 |
| Food & drink | 7 | 0 |
| Animals & nature | 5 | 0 |
| Music | 5 | 0 |
| Movies & TV | 4 | 0 |
| Video games & board games | 9 | 0 |
| Sports | 8 | 0 |
| Health & medicine | 8 | 0 |
| Government & open data | 13 | 0 |
| Environment & climate data | 4 | 0 |
| Art & museums | 2 | 0 |
| Images & media | 6 | 0 |
| Internet & networking | 7 | 0 |
| Developer tools | 15 | 0 |
| Fun & trivia | 16 | 0 |
| Time & calendars | 4 | 0 |
| Travel & transport | 2 | 0 |

## All sources

| Result | Name | Id | Category | Access | Detail |
| --- | --- | --- | --- | --- | --- |
| PASS | Cat facts (catfact.ninja) | `catfact` | Animals & nature | direct | 5 · Unlike dogs, cats do not have a sweet tooth. Scientists believe this is due to a mutation in a key taste receptor. |
| PASS | Dog CEO | `dogceo` | Animals & nature | direct | 1 · Random dog photo |
| PASS | GBIF Species | `gbif` | Animals & nature | direct | 5 · Panthera leo |
| PASS | GBIF Occurrences | `gbif-occ` | Animals & nature | direct | 5 · Panthera leo melanochaita (C.E.H.Smith, 1858) · South Africa |
| PASS | iNaturalist | `inaturalist` | Animals & nature | direct | 5 · Red Fox (Vulpes vulpes) |
| PASS | Art Institute of Chicago | `artic` | Art & museums | direct | 5 · Early Morning, Tarpon Springs |
| PASS | Met Museum Collection | `met` | Art & museums | direct | 5 · Sunflowers |
| PASS | Internet Archive | `archiveorg` | Books & reading | direct | 5 · KSCO 1080 AM [AM 1080 KSCO] : November 27, 2019 09:00PM-10:00PM PST |
| PASS | Bible API | `bible` | Books & reading | direct | 1 · John 3:16 |
| PASS | Open Library | `openlibrary` | Books & reading | direct | 5 · The Hobbit (1937) |
| PASS | PoetryDB | `poetrydb` | Books & reading | direct | 5 · A Lover's Complaint |
| PASS | Bundlephobia (npm bundle size) | `bundlephobia` | Developer tools | direct | 1 · react@19.3.1 |
| PASS | crates.io | `crates` | Developer tools | direct | 5 · serde@1.0.229 |
| PASS | endoflife.date (release cycles) | `endoflife` | Developer tools | direct | 5 · Nodejs 26 |
| PASS | GitHub Search | `github` | Developer tools | direct | 5 · vercel/next.js |
| PASS | GitLab Public Projects | `gitlab` | Developer tools | direct | 5 · gitlab-org/gitlab-runner |
| PASS | Have I Been Pwned (password range) | `hibp-range` | Developer tools | direct | 5 · Hash suffix 0002EEFFB2CCA91812B5CC9956854E22BEB |
| PASS | HN Algolia (comments) | `hn-comments` | Developer tools | direct | 5 · Here's a good write-up on the difference between postgres and MS SQL.http://www.pg-versus-ms.com/I&# |
| PASS | jsDelivr Package Stats | `jsdelivr` | Developer tools | direct | 1 · react |
| PASS | MDN Web Docs (search) | `mozilla-mdn` | Developer tools | proxy | 5 · Fetch API |
| PASS | Node.js release index | `nodejs-releases` | Developer tools | direct | 5 · Node.js v27.0.0-alpha.0.2.0 |
| PASS | npm Registry | `npm` | Developer tools | direct | 5 · express@5.3.0 |
| PASS | Packagist (PHP) | `packagist` | Developer tools | proxy | 5 · monolog/monolog |
| PASS | PyPI (pypi.org JSON) | `pypi` | Developer tools | proxy | 1 · requests@2.34.2 |
| PASS | ReqRes (mock users) | `reqres` | Developer tools | direct | 5 · Michael Lawson |
| PASS | Stack Exchange (Stack Overflow) | `stackexchange` | Developer tools | direct | 5 · How do I reverse a list or loop over it backwards? |
| PASS | EMSC Seismic Portal | `emsc` | Earthquakes & hazards | direct | 5 · TARAPACA, CHILE |
| PASS | NASA EONET | `eonet` | Earthquakes & hazards | direct | 5 · Wildfire Little Ridge, Highland, Virginia |
| PASS | GeoNet New Zealand | `geonet` | Earthquakes & hazards | direct | 5 · 10 km north-west of Ruatoria |
| PASS | Open-Meteo Flood | `openmeteo-flood` | Earthquakes & hazards | direct | 1 · River discharge · Berlin |
| PASS | UK Flood Monitoring | `ukflood` | Earthquakes & hazards | direct | 5 · South Cornwall coast from Lizard Point to Gribbin Head excluding the Tidal Fal Estuary |
| PASS | USGS Earthquakes | `usgs` | Earthquakes & hazards | direct | 5 · M 0.9 - 85 km NNW of Karluk, Alaska |
| PASS | USGS Volcano Hazards | `usgs-volcano` | Earthquakes & hazards | direct | 5 · Adagdak |
| PASS | UK Carbon Intensity | `carbon-intensity` | Environment & climate data | direct | 1 · UK grid carbon intensity |
| PASS | UK Generation Mix | `carbon-intensity-generation` | Environment & climate data | direct | 1 · UK generation mix now |
| PASS | Energy-Charts (Fraunhofer ISE) | `energy-charts` | Environment & climate data | proxy | 5 · Hydro pumped storage consumption |
| PASS | NOAA CO-OPS tide levels (San Francisco) | `noaa-tides` | Environment & climate data | direct | 1 · 2026-11-26 19:00 UTC |
| PASS | Studio Ghibli API | `ghibli` | Movies & TV | direct | 5 · Castle in the Sky (1986) |
| PASS | IMDb Suggestions | `imdb-suggest` | Movies & TV | proxy | 5 · Inception (2010) |
| PASS | TVmaze | `tvmaze` | Movies & TV | direct | 5 · Breaking Bad (2008) |
| PASS | TVmaze Schedule | `tvmaze-schedule` | Movies & TV | direct | 5 · Good Morning America · S2026E236 |
| PASS | Blockchain.com Stats | `blockchain-info` | Finance & crypto | direct | 1 · Bitcoin network |
| PASS | Bank of Canada exchange rates | `boc-fx` | Finance & crypto | direct | 5 · USD → CAD 1.4219 |
| PASS | Central Bank of Russia Rates (mirror) | `cbr` | Finance & crypto | proxy | 5 · AUD · Австралийский доллар |
| PASS | Coinbase Spot Price | `coinbase` | Finance & crypto | direct | 1 · BTC/USD spot |
| PASS | CoinGecko | `coingecko` | Finance & crypto | direct | 1 · Bitcoin · $60,462 |
| PASS | CoinPaprika | `coinpaprika` | Finance & crypto | direct | 5 · Ethereum |
| PASS | Frankfurter (ECB rates) | `currency` | Finance & crypto | direct | 1 · 100 USD = 91.12 EUR |
| PASS | ECB Data Portal | `ecbstats` | Finance & crypto | direct | 1 · ECB EUR/USD reference |
| PASS | Open Exchange Rates (ER-API) | `erapi` | Finance & crypto | direct | 1 · Exchange rates · base USD |
| PASS | Currency API (200+ currencies) | `fawaz-currency` | Finance & crypto | direct | 1 · Currency rates · base USD |
| PASS | Crypto Fear & Greed Index | `fear-greed` | Finance & crypto | direct | 5 · Extreme Fear · 11/100 |
| PASS | GLEIF LEI Register | `gleif` | Finance & crypto | direct | 5 · APPLE TREE |
| PASS | Kraken Public Ticker | `kraken` | Finance & crypto | direct | 1 · Kraken · XBT/USD |
| PASS | mempool.space Fees | `mempool` | Finance & crypto | direct | 1 · Bitcoin recommended fees |
| PASS | National Bank of Poland Rates | `nbp` | Finance & crypto | direct | 1 · NBP · USD/PLN |
| PASS | US Treasury Fiscal Data | `treasury` | Finance & crypto | direct | 5 · Debt to the penny · 2026-11-24 |
| PASS | World Bank Indicators | `worldbank` | Finance & crypto | direct | 5 · United States · GDP 2025 |
| PASS | CocktailDB | `cocktail` | Food & drink | direct | 4 · Mojito |
| PASS | Fruityvice | `fruityvice` | Food & drink | proxy | 1 · Banana |
| PASS | Open Beauty Facts | `openbeautyfacts` | Food & drink | direct | 5 · Coconut Milk |
| PASS | Open Food Facts (barcode) | `openfacts-barcode` | Food & drink | direct | 1 · Nutella |
| PASS | TheMealDB | `themealdb` | Food & drink | direct | 5 · Chicken Handi |
| PASS | TheMealDB (random) | `themealdb-random` | Food & drink | direct | 1 · Saskatoon Pie |
| PASS | UK Food Standards Ratings | `ukfood` | Food & drink | direct | 5 · Tesco |
| PASS | Advice Slip | `advice` | Fun & trivia | direct | 1 · Advice #127 |
| PASS | Agify (age guess from a name) | `agify` | Fun & trivia | direct | 1 · Michael |
| PASS | Bored API (activities) | `bored` | Fun & trivia | proxy | 1 · Volunteer at your local food bank |
| PASS | Chuck Norris Jokes | `chucknorris` | Fun & trivia | direct | 1 · If you somehow survive a roundhouse kick from Chuck Norris, you'd still go to jail for head butting his foot. |
| PASS | Genderize (gender guess from a name) | `genderize` | Fun & trivia | direct | 1 · Peter |
| PASS | Hipsum (placeholder text) | `hipsum` | Fun & trivia | direct | 1 · Placeholder paragraph |
| PASS | An API of Ice and Fire (Game of Thrones) | `ice-and-fire` | Fun & trivia | direct | 1 · Jon Snow |
| PASS | JokeAPI | `jokes` | Fun & trivia | direct | 3 · Why couldn't the skeleton go to the Christmas party? |
| PASS | Nationalize (nationality guess) | `nationalize` | Fun & trivia | direct | 5 · Likely country: US |
| PASS | Potter API (Harry Potter characters) | `potter-api` | Fun & trivia | direct | 5 · Harry James Potter |
| PASS | The Simpsons API | `simpsons` | Fun & trivia | direct | 5 · Homer Simpson |
| PASS | Open Trivia DB | `trivia-opentdb` | Fun & trivia | direct | 3 · The key of sharps does the key of G# minor contain? |
| PASS | The Trivia API | `trivia-v2` | Fun & trivia | direct | 5 · What is Venereology the study of? |
| PASS | Type.fit quotes | `typefit-quotes` | Fun & trivia | proxy | 5 · Genius is one percent inspiration and ninety-nine percent perspiration. |
| PASS | Useless Facts | `uselessfacts` | Fun & trivia | direct | 1 · There were always 56 curls in Shirley Temple`s hair. |
| PASS | ZenQuotes | `zenquotes` | Fun & trivia | proxy | 1 · You cannot control the behavior of others, but you can always choose how you respond to it. |
| PASS | CheapShark Deals | `cheapshark` | Video games & board games | direct | 5 · Bread and Fred |
| PASS | CheapShark Game Search | `cheapshark-search` | Video games & board games | direct | 5 · Portal |
| PASS | Digi-API (Digimon) | `digimon` | Video games & board games | direct | 5 · Agumon |
| PASS | Free-to-Play Games | `freetogame` | Video games & board games | direct | 5 · Overwatch |
| PASS | Overfast API (Overwatch heroes) | `overwatch-heroes` | Video games & board games | direct | 5 · Ana |
| PASS | PokéAPI | `pokeapi` | Video games & board games | direct | 1 · Pikachu |
| PASS | speedrun.com (games) | `speedrun` | Video games & board games | direct | 5 · Cat Mario |
| PASS | Warframe Stats | `warframe` | Video games & board games | direct | 5 · Amesha |
| PASS | YGOPRODeck (Yu-Gi-Oh! cards) | `ygoprodeck` | Video games & board games | direct | 5 · Dark Magician |
| PASS | BigDataCloud Reverse Geocode | `bigdatacloud` | Geography & places | direct | 1 · Santa Maria Maior, Portugal |
| PASS | FlagCDN (country codes) | `flagcdn` | Geography & places | direct | 5 · AD · Andorra |
| PASS | ipwho.is | `ipwhois` | Geography & places | direct | 1 · 1.1.1.1 · Brisbane, Australia |
| PASS | OpenStreetMap Nominatim | `nominatim` | Geography & places | proxy | 5 · Lisboa, Portugal |
| PASS | Open-Elevation | `open-elevation` | Geography & places | direct | 1 · Zurich · 435 m |
| PASS | Open-Meteo Geocoding | `openmeteo-geo` | Geography & places | direct | 5 · Lisbon, Portugal |
| PASS | City of Chicago Crime Reports | `chicago-crimes` | Government & open data | direct | 5 · STALKING |
| PASS | US Congress Legislators | `congress-legislators` | Government & open data | direct | 5 · Maria Cantwell |
| PASS | data.gov.au (CKAN) | `data-gov-au` | Government & open data | direct | 5 · Australia's Maritime Jurisdiction around Australia |
| PASS | EU Open Data Portal | `eu-open-data` | Government & open data | direct | 5 · England Population - Count |
| PASS | Eurostat inflation (Germany, HICP) | `eurostat` | Government & open data | direct | 5 · Germany inflation · 2025-12 |
| PASS | GOV.UK Search API | `govuk-search` | Government & open data | direct | 5 · Apply for your first provisional driving licence |
| PASS | NYC 311 Service Requests | `nyc-311` | Government & open data | direct | 5 · Illegal Parking |
| PASS | Open Government Canada (CKAN) | `open-canada` | Government & open data | direct | 5 · Reconstructed river water temperature dataset over Canada 1980-2018. |
| PASS | UK Parliament Members | `uk-parliament` | Government & open data | direct | 5 · Alan Johnson |
| PASS | UK Police Crime Data | `uk-police` | Government & open data | direct | 5 · Crime data · 2026-09 |
| PASS | UK Parliament Bills | `ukgov-bills` | Government & open data | proxy | 5 · Climate and Ecology Bill |
| PASS | postcodes.io (UK postcodes) | `ukgov-postcode` | Government & open data | direct | 1 · SW1A 1AA |
| PASS | USAspending.gov agencies | `usaspending` | Government & open data | direct | 5 · 400 Years of African-American History Commission |
| PASS | ClinicalTrials.gov | `clinicaltrials` | Health & medicine | direct | 5 · A Survey To Elicit The Relationship Between Literacy And Glycemic Control In Pediatric Diabetes |
| PASS | disease.sh (COVID-19 stats) | `covid-disease-sh` | Health & medicine | direct | 1 · COVID-19 · Germany |
| PASS | MedlinePlus Connect | `medlineplus` | Health & medicine | proxy | 5 · Diabetes |
| PASS | RxNorm (NLM) | `nih-rxnorm` | Health & medicine | direct | 5 · {100 (acetaminophen 250 MG / aspirin 250 MG / caffeine 65 MG Oral Tablet [Excedrin]) / 24 (acetaminophen 250 MG / aspirin 250 MG / diphenhydramine citrate 38 MG Oral Tablet [Excedrin PM Triple Action]) } Pack [Excedrin PM Triple Action Caplets and Excedrin Extra Strength Pain Reliever] |
| PASS | openFDA Device Events | `openfda-device` | Health & medicine | direct | 5 · ELECTRODE, PACEMAKER, PERMANENT |
| PASS | openFDA Drug Labels | `openfda-drug` | Health & medicine | direct | 5 · Ibuprofen Dye Free |
| PASS | openFDA Food Recalls | `openfda-recall` | Health & medicine | direct | 5 · Ground Up Nut Butter Cups filled with Almond & Cashew Butter Dark Chocolate Two Pack. Net |
| PASS | wger (exercise database) | `wger` | Health & medicine | direct | 5 · 2 Handed Kettlebell Swing |
| PASS | Cloudflare DNS-over-HTTPS | `cloudflare-dns` | Internet & networking | direct | 2 · example.com → 104.20.23.154 |
| PASS | Common Crawl index | `commoncrawl` | Internet & networking | direct | 5 · November 2026 Index |
| PASS | geolocation-db.com (my IP) | `geolocation-db` | Internet & networking | direct | 1 · 98.88.87.70 · Seattle, United States |
| PASS | Google Public DNS | `google-dns` | Internet & networking | direct | 5 · gmail.com MX |
| PASS | httpbin | `httpbin` | Internet & networking | direct | 1 · Your request, echoed |
| PASS | ipify (my public IP) | `ipify` | Internet & networking | direct | 1 · Your public IP: 98.88.87.70 |
| PASS | RDAP (domain registration) | `rdap` | Internet & networking | direct | 1 · EXAMPLE.COM |
| PASS | Datamuse | `datamuse` | Language & words | proxy | 1 · happy |
| PASS | LanguageTool | `languagetool` | Language & words | direct | 2 · This sentence does not start with an uppercase letter. |
| PASS | MyMemory Translation | `mymemory` | Language & words | direct | 1 · bonjour |
| PASS | Urban Dictionary | `urbandictionary` | Language & words | direct | 5 · Yeet |
| PASS | Wiktionary | `wiktionary` | Language & words | direct | 1 · serendipity · Noun |
| PASS | Wikimedia Commons | `commons` | Images & media | direct | 5 · Lightning striking the Eiffel Tower - NOAA.jpg |
| PASS | DiceBear avatars | `dicebear` | Images & media | proxy | 1 · Avatar · frederick |
| PASS | Iconify (icon search) | `iconify` | Images & media | direct | 5 · material-symbols:home |
| PASS | Imgflip meme templates | `imgflip` | Images & media | direct | 5 · Drake Hotline Bling |
| PASS | Lorem Picsum | `picsum` | Images & media | direct | 5 · Photo by Alejandro Escamilla |
| PASS | Podcast Index (iTunes podcasts) | `podcast-search` | Images & media | direct | 5 · Notnerd Podcast: Tech Better |
| PASS | Deezer Search | `deezer` | Music | proxy | 5 · Starboy · The Weeknd |
| PASS | Apple iTunes Search | `itunes` | Music | direct | 4 · Bohemian Rhapsody · Queen |
| PASS | ListenBrainz (user search) | `listenbrainz` | Music | direct | 5 · _rob_ |
| PASS | LRCLIB (synced lyrics) | `lrclib` | Music | direct | 5 · YELLOW · Yellow Generation |
| PASS | Radio Browser | `radiobrowser` | Music | direct | 5 · 101 SMOOTH JAZZ |
| PASS | Hacker News (Algolia) | `hackernews` | News & tech | direct | 5 · Is Firefox under performing because of its Rust powered engine, Servo? |
| PASS | Lobsters | `lobsters` | News & tech | proxy | 5 · Slow Ubuntu security response times |
| PASS | Nobel Prize laureates | `nobel` | Reference & encyclopedias | direct | 3 · Irène Joliot-Curie |
| PASS | Wikidata | `wikidata` | Reference & encyclopedias | direct | 5 · Lisbon |
| PASS | Wikipedia | `wikipedia` | Reference & encyclopedias | direct | 5 · Marie Curie |
| PASS | ChEMBL | `chembl` | Science & research | direct | 5 · ASPIRIN |
| PASS | Crossref | `crossref` | Science & research | direct | 5 · Machine learning with sklearn |
| PASS | Ensembl Genes | `ensembl` | Science & research | direct | 1 · BRCA2 |
| PASS | INSPIRE-HEP | `inspire` | Science & research | direct | 5 · Boson-Fermion and Boson-Boson Scattering in a Yang-Mills Theory at High-Energy: Sixth Order Perturbation Theory |
| PASS | Newton Math Solver | `newton` | Science & research | direct | 1 · derive(x^2) |
| PASS | PubChem | `pubchem` | Science & research | direct | 1 · Aspirin |
| PASS | PubMed (NCBI) | `pubmed` | Science & research | direct | 5 · Precision/Locus-Selective G-Quadruplex Stabilization as the Next Medicinal Chemistry Challenge. |
| PASS | QuickGO Gene Ontology | `quickgo` | Science & research | direct | 5 · execution phase of apoptosis |
| PASS | RCSB Protein Data Bank | `rcsb` | Science & research | direct | 1 · THE CRYSTAL STRUCTURE OF HUMAN DEOXYHAEMOGLOBIN AT 1.74 ANGSTROMS RESOLUTION |
| PASS | ROR Research Organizations | `ror` | Science & research | direct | 5 · International Tourism Institute |
| PASS | UniProt | `uniprot` | Science & research | direct | 5 · Insulin |
| PASS | Wellcome Collection works | `wellcome` | Science & research | direct | 5 · Plague : how to recognise, prevent and treat plague / by James Cantlie. |
| PASS | Zenodo | `zenodo` | Science & research | direct | 5 · ComFaceID_Class_Model |
| PASS | CelesTrak Orbital Elements | `celestrak` | Space & astronomy | direct | 1 · ISS (ZARYA) |
| PASS | NASA Exoplanet Archive | `exoplanets` | Space & astronomy | proxy | 5 · TOI-6647 b |
| PASS | NASA JPL Close Approaches | `jpl-cad` | Space & astronomy | proxy | 5 · Asteroid 2026 VQ19 close approach |
| PASS | NASA JPL Small-Body Database | `jpl-sbdb` | Space & astronomy | proxy | 1 · 99942 Apophis (2004 MN4) |
| PASS | Launch Library 2 | `launchlibrary` | Space & astronomy | direct | 5 · Long March 2D / Yaogan 49 Group 01 |
| PASS | NASA Image and Video Library | `nasaimages` | Space & astronomy | direct | 5 · NASA Dedicates Martian Landmarks To Apollo 1 Crew |
| PASS | Spaceflight News API | `spaceflightnews` | Space & astronomy | direct | 5 · The ‘bare-knuckled’ future of life in space with Tim Marshall |
| PASS | Sunrise Sunset | `sunrise` | Space & astronomy | direct | 1 · Sun times · Lisbon |
| PASS | NOAA Space Weather Scales | `swpc` | Space & astronomy | direct | 5 · Space weather 2026-11-26 |
| PASS | Where the ISS at? | `whereiss` | Space & astronomy | direct | 1 · International Space Station |
| PASS | ESPN Scoreboard (MLB) | `espn-mlb` | Sports | direct | 1 · Milwaukee Brewers at Tampa Bay Rays |
| PASS | ESPN Scoreboard (NBA) | `espn-nba` | Sports | direct | 5 · Miami Heat at New York Knicks |
| PASS | ESPN Scoreboard (NHL) | `espn-nhl` | Sports | direct | 5 · Toronto Maple Leafs at Boston Bruins |
| PASS | ESPN Scoreboard (NFL) | `espn-scoreboard` | Sports | direct | 5 · Chicago Bears at Detroit Lions |
| PASS | ESPN Scoreboard (Premier League) | `espn-soccer` | Sports | direct | 1 · Chelsea at Nottingham Forest |
| PASS | Jolpica F1 (Ergast successor) | `jolpica-f1` | Sports | direct | 5 · 1. Andrea Kimi Antonelli |
| PASS | MLB Stats API | `mlb-stats` | Sports | direct | 5 · Rays |
| PASS | NHL Stats API | `nhl-stats` | Sports | proxy | 5 · Carolina Hurricanes |
| PASS | Hebcal (Hebrew calendar) | `hebcal` | Time & calendars | direct | 1 · 16 Kislev 5787 |
| PASS | Nager.Date Country List | `nager-countries` | Time & calendars | direct | 5 · Andorra |
| PASS | Nager.Date Public Holidays | `nager-holidays` | Time & calendars | direct | 5 · Neujahr |
| PASS | timeapi.io (time zones) | `timeapi-io` | Time & calendars | direct | 1 · Europe/Berlin · 20:06 |
| PASS | Swiss public transport (opendata.ch) | `swiss-transport` | Travel & transport | direct | 5 · Zürich HB |
| PASS | Transport for London (tube status) | `tfl` | Travel & transport | direct | 5 · Bakerloo line |
| PASS | 7Timer! Civil Forecast | `7timer` | Weather & climate | proxy | 1 · Madrid · 7Timer |
| PASS | MET Norway Locationforecast | `metno` | Weather & climate | direct | 1 · Oslo · MET Norway |
| PASS | US National Weather Service | `nws` | Weather & climate | direct | 1 · Chicago · Thanksgiving Day |
| PASS | NWS Active Alerts (California) | `nws-alerts` | Weather & climate | direct | 5 · Dense Fog Advisory |
| PASS | Open-Meteo Air Quality | `openmeteo-air` | Weather & climate | direct | 1 · Air quality · Berlin |
| PASS | Open-Meteo Historical | `openmeteo-archive` | Weather & climate | direct | 3 · 2024-07-01 · Berlin |
| PASS | Open-Meteo Climate Projections | `openmeteo-climate` | Weather & climate | direct | 3 · 2030-01-01 · Berlin (projection) |
| PASS | Open-Meteo Marine | `openmeteo-marine` | Weather & climate | direct | 1 · Waves · Biarritz |
| PASS | Open-Meteo Forecast | `weather` | Weather & climate | direct | 1 · Lisbon, Portugal |
| PASS | wttr.in | `wttr` | Weather & climate | direct | 1 · Madrid · Partly Cloudy |
