import * as model from './model.js';
import recipeView from './views/recipeView.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    // h2 1) loading recipe
    await model.loadRecipe(id);

    // h2 2) rendering recipe
    recipeView.render(model.state.recipe); // data from ln above is put into the render-method in recipeView.js
  } catch (err) {
    recipeView.renderError();
  }
};
controlRecipes();

const init = function () {
  // subscriber
  recipeView.addHandlerRender(controlRecipes);
};
init();
