import { AppState } from 'src/app/store/app.reducers';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeActions, SET_RECIPES, ADD_RECIPE, UPDATE_RECIPE, DELETE_RECIPE } from './recipe.actions';

export interface FeatureState extends AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState = {
  recipes: [
    new Recipe(
      '1',
      'Halloween Bar',
      'This is a tasty halloween cookie bar.',
      'http://assets.kraftfoods.com/recipe_images/opendeploy/54852_640x428.jpg',
      [
        new Ingredient('sugar', 2),
        new Ingredient('bag of candy corn', 1)
      ]
    ),
    new Recipe(
      '2',
      'Chocolate Chip Cookies',
      'Classic favorite.',
      'https://images-gmi-pmc.edge-generalmills.com/087d17eb-500e-4b26-abd1-4f9ffa96a2c6.jpg',
      [
        new Ingredient('bag of chocolate chips', 1),
        new Ingredient('flour', 4),
        new Ingredient('butter', 1)
      ]
    ),
  ]
};

export function recipeReducer(state = initialState, action: RecipeActions) {
  switch (action.type) {
    case SET_RECIPES:
      return setRecipes(state, action);

    case ADD_RECIPE:
      return addRecipe(state, action);

    case UPDATE_RECIPE:
      return updateRecipe(state, action);

    case DELETE_RECIPE:
      return deleteRecipe(state, action);

    default:
      return state;
  }
}

function setRecipes(state, action) {
  const recipes = [...action.payload];
  return {
    ...state,
    recipes,
  };
}

function addRecipe(state, action) {
  const id = newRecipeId(state.recipes);
  const recipes = [...state.recipes, { ...action.payload, id }];
  return {
    ...state,
    recipes,
  };
}

function newRecipeId(recipes) {
  const initialId = '1';
  const maxId = recipes.reduce((max, { id }) => id > max ? id : max, initialId);
  return (parseFloat(maxId) + 1).toString();
}

function updateRecipe(state, action) {
  const { payload: updatedRecipe } = action;
  const recipes = state.recipes.map((recipe) => {
    if (recipe.id === updatedRecipe.id) {
      return { ...recipe, ...updatedRecipe };
    }
    return recipe;
  });
  return {
    ...state,
    recipes,
  };
}

function deleteRecipe(state, action) {
  const { payload: targetId } = action;
  const recipes = state.recipes.filter(({ id }) => targetId !== id);
  return {
    ...state,
    recipes,
  };
}
