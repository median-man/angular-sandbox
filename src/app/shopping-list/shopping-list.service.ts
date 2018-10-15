import { Injectable, EventEmitter } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

@Injectable({ providedIn: 'root' })

export class ShoppingListService {
  ingredientChange = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 2),
  ];

  getIngredients = () => [...this.ingredients];

  addIngredient = (ingredient: Ingredient) => {
    this.ingredients.push(ingredient);
    this.ingredientChange.emit(this.getIngredients());
  }
}
