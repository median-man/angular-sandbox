import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent {
  ingredients: Observable<Ingredient[]>;

  constructor(
      private shoppingListService: ShoppingListService,
      private store: Store<{shoppingList: { ingredients: Ingredient[] } }>) {
        this.ingredients = this.store.pipe(map(state => state.shoppingList.ingredients));
      }

  onEditItem(index: number) {
    this.shoppingListService.editItem.next(index);
  }
}
