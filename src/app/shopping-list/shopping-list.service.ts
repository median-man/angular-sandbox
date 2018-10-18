import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

@Injectable({ providedIn: 'root' })

export class ShoppingListService {
  ingredientChange = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 2),
  ];

  private copyIngredient = (ingredient: Ingredient) => Object.assign({}, ingredient);

  getIngredients = () => this.ingredients.map(this.copyIngredient);

  addIngredient = (...ingredients: Ingredient[]) => {
    this.ingredients.push(...ingredients.map(this.copyIngredient));
    this.ingredientChange.next(this.getIngredients());
  }
}
