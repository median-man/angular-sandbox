import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { AppState } from './store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent {
  ingredients: Observable<Ingredient[]>;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<AppState>
  ) {
    this.ingredients = this.store.pipe(map(state => state.shoppingList.ingredients));
  }

  onEditItem(index: number) {
    this.shoppingListService.editItem.next(index);
  }
}
