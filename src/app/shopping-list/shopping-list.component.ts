import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import { AppState } from './store/shopping-list.reducers';
import {
  OpenIngredient as OpenIngredientForEditing,
} from './store/shoping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent {
  ingredients: Observable<Ingredient[]>;

  constructor(private store: Store<AppState>) {
    this.ingredients = this.store
      .pipe(map(state => state.shoppingList.ingredients));
  }

  onEditItem(index: number) {
    this.store.dispatch(new OpenIngredientForEditing(index));
  }
}
