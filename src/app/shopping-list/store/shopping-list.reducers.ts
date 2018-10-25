import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListActions, ADD_INGREDIENTS } from './shoping-list.actions';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 2),
  ],
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions) {
  switch (action.type) {
    case ADD_INGREDIENTS:
      return addIngredients(state, action);

    default:
      return state;
  }
}

function addIngredients(state, action) {
  const { payload: ingredients } = action;
  return {
    ...state,
    ingredients: state.ingredients.concat(ingredients),
  };
}
