import { Action } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]) { }
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;

  constructor(public payload: number) { }
}

export type ShoppingListActions = AddIngredients | DeleteIngredient;
