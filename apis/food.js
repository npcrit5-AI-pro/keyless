(function (K) {
  'use strict';
  const enc = K.enc;

  K.category('food', 'Food & drink', [
    {
      id: 'openfacts-barcode', name: 'Open Food Facts (barcode)', home: 'https://world.openfoodfacts.org/',
      kw: 'barcode_lookup:3 upc:3 ean:3 scan_barcode:3',
      sample: '3017620422003',
      run: async q => {
        const code = K.need(q.match(/\d{8,14}/), 'Give a barcode with 8–14 digits.')[0];
        const d = await K.http(`https://world.openfoodfacts.org/api/v2/product/${code}.json`);
        K.need(d.status === 1, `No product for barcode ${code}.`);
        const p = d.product;
        return [{ title: p.product_name || code, body: p.brands || '', link: `https://world.openfoodfacts.org/product/${code}` }];
      },
    },
    {
      id: 'openbeautyfacts', name: 'Open Beauty Facts', home: 'https://world.openbeautyfacts.org/',
      kw: 'cosmetics:3 cosmetic:3 beauty_product:3 skincare:3 shampoo:2 makeup:2',
      sample: 'shampoo',
      url: q => `https://world.openbeautyfacts.org/cgi/search.pl?search_terms=${enc(K.term(q))}&search_simple=1&action=process&json=1&page_size=5`,
      list: 'products',
      title: p => p.product_name || '(unnamed)',
      body: p => p.brands || '',
      link: p => `https://world.openbeautyfacts.org/product/${p.code}`,
    },
    {
      id: 'themealdb', name: 'TheMealDB', home: 'https://www.themealdb.com/',
      kw: 'recipe:3 recipes:3 meal:3 meals:3 cook:3 cooking:2 dish:2 dishes:2 dinner:2 lunch:2 cuisine:2',
      sample: 'chicken recipes',
      url: q => `https://www.themealdb.com/api/json/v1/1/search.php?s=${enc(K.term(q))}`,
      list: 'meals',
      title: 'strMeal',
      body: m => `${m.strArea || ''} ${m.strCategory || ''}`.trim(),
      link: 'strSource',
    },
    {
      id: 'themealdb-random', name: 'TheMealDB (random)', home: 'https://www.themealdb.com/',
      kw: 'random_recipe:3 random_meal:3 what_to_eat:3 meal_idea:2 dinner_idea:2',
      sample: 'random recipe',
      url: () => 'https://www.themealdb.com/api/json/v1/1/random.php',
      list: 'meals',
      title: 'strMeal',
      body: m => `${m.strArea || ''} ${m.strCategory || ''}`.trim(),
      link: 'strSource',
    },
    {
      id: 'cocktail', name: 'CocktailDB', home: 'https://www.thecocktaildb.com/',
      kw: 'cocktail:3 cocktails:3 drink:3 drinks:3 mocktail:2 bartender:2',
      sample: 'cocktail mojito',
      url: q => `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${enc(K.term(q))}`,
      list: 'drinks',
      title: 'strDrink',
      body: d => `${d.strCategory || ''} · ${d.strGlass || ''}`,
      link: d => `https://www.thecocktaildb.com/drink/${d.idDrink}`,
    },
    {
      id: 'fruityvice', name: 'Fruityvice', home: 'https://www.fruityvice.com/', proxy: true,
      kw: 'fruit:3 fruits:3 fruity:2 fruit_nutrition:3 vitamin:2',
      sample: 'banana',
      url: q => `https://www.fruityvice.com/api/fruit/${enc(K.term(q).toLowerCase())}`,
      list: d => [d],
      title: 'name',
      body: x => `${x.family} · ${Math.round(x.nutritions.calories)} kcal · ${x.nutritions.sugar} g sugar per 100 g`,
      link: 'https://www.fruityvice.com/',
      facts: x => [['Calories', `${x.nutritions.calories} kcal`], ['Sugar', `${x.nutritions.sugar} g`], ['Protein', `${x.nutritions.protein} g`]],
    },
    {
      id: 'ukfood', name: 'UK Food Standards Ratings', home: 'https://api.ratings.food.gov.uk/',
      kw: 'food_hygiene:3 food_rating:3 restaurant_hygiene:3 food_standards:2 hygiene_rating:3',
      sample: 'Tesco',
      run: async q => {
        const d = await K.http(`https://api.ratings.food.gov.uk/Establishments?name=${enc(K.term(q))}&pageSize=5`, { headers: { 'x-api-version': '2' } });
        return (d.establishments || []).slice(0, 5).map(e => ({
          title: e.BusinessName,
          body: `Hygiene rating ${e.RatingValue} · ${e.AddressLine1 || e.LocalAuthorityName || ''}`,
          link: 'https://ratings.food.gov.uk/',
        }));
      },
    },
  ], {
    kw: 'eat:2 eating:2 hungry:2 kitchen:2 snack:1',
  });
})(Keyless);
