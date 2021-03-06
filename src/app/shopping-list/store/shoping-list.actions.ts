import { Action } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const OPEN_INGREDIENT = 'OPEN_INGREDIENT'; // open for editing
export const CLOSE_INGREDIENT = 'CLOSE_INGREDIENT'; // open for editing

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]) { }
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;

  constructor(public payload: { ingredient: Ingredient}) { }
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
}

// Opens an ingredient for editing
export class OpenIngredient implements Action {
  readonly type = OPEN_INGREDIENT;

  constructor(public payload: number) { }
}

// Closes an ingredient for editing
export class CloseIngredient implements Action {
  readonly type = CLOSE_INGREDIENT;
}

export type ShoppingListActions =
  AddIngredients |
  DeleteIngredient |
  UpdateIngredient |
  OpenIngredient |
  CloseIngredient;
