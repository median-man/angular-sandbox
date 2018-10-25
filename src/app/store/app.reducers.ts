import * as shoppingList from '../shopping-list/store/shopping-list.reducers';
// import * as auth from '../auth/store/auth.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  shoppingList: shoppingList.State;
  // auth: auth.State;
}

export const reducers: ActionReducerMap<AppState> = {
  shoppingList: shoppingList.shoppingListReducer,
  // auth: auth.authReducer,
};
