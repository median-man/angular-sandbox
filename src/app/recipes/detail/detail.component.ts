import { Component, Input } from '@angular/core';

import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './detail.component.html'
})

export class DetailComponent {
  @Input() recipe: Recipe;

  constructor(private shoppingListService: ShoppingListService) { }

  addIngredientsToShoppingList = () => {
    this.shoppingListService.addIngredient(...this.recipe.ingredients);
  }
}
