import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';
// import { keyFor } from 'core-js/fn/symbol';

// h1 state-object
export const state = {
  recipe: {},
  serach: {
    query: '',
    results: [],
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.sourc_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (err) {
    // temp error handler
    console.error(`${err} 💣💣`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.serach.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);

    state.serach.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    // const data = await getJSON(`https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza`)
  } catch (err) {
    console.error(`${err} 💣💣💣`);
    throw err;
  }
};
