import { Ingredient } from 'src/app/shared/ingredient.model';
import {
  ShoppingListActions,
  ADD_INGREDIENTS,
  UPDATE_INGREDIENT,
  DELETE_INGREDIENT,
  OPEN_INGREDIENT,
  CLOSE_INGREDIENT
} from './shoping-list.actions';

export interface AppState {
  shoppingList: State;
}

export interface State {
  ingredients: Ingredient[];
  editItemAt: number;
  editIngredient: Ingredient;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 2),
  ],
  editItemAt: -1,
  editIngredient: null,
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions) {
  switch (action.type) {
    case CLOSE_INGREDIENT:
      return closeIngredientForEditing(state);

    case ADD_INGREDIENTS:
      return addIngredients(state, action);

    case UPDATE_INGREDIENT:
      return updateIngredient(state, action);

    case DELETE_INGREDIENT:
      return deleteIngredient(state);

    case OPEN_INGREDIENT:
      return openIngredientForEditing(state, action);

    default:
      return state;
  }
}

function closeIngredientForEditing(state) {
  return {
    ...state,
    editItemAt: initialState.editItemAt,
    editIngredient: initialState.editIngredient,
  };
}

function addIngredients(state, action) {
  const { payload: ingredients } = action;
  return {
    ...state,
    ingredients: state.ingredients.concat(ingredients),
  };
}

function updateIngredient(state, action) {
  const { ingredient } = action.payload;
  const index = state.editItemAt;
  const ingredients = [...state.ingredients];
  const updatedIngredient = { ...ingredients[index], ...ingredient };
  ingredients[index] = updatedIngredient;
  return {
    ...state,
    ingredients,
  };
}

function deleteIngredient(state) {
  const index = state.editItemAt;
  const { ingredients } = state;
  return {
    ...state,
    ingredients: [...ingredients.slice(0, index), ...ingredients.slice(index + 1)],
  };
}

function openIngredientForEditing(state, action) {
  const { payload: editItemAt } = action;
  const editIngredient = { ...state.ingredients[editItemAt] };
  return {
    ...state,
    editItemAt,
    editIngredient
  };
}
