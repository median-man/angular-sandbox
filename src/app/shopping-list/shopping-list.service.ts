import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

@Injectable({ providedIn: 'root' })

export class ShoppingListService {
  ingredientChange = new Subject<Ingredient[]>();
  editItem = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 2),
  ];

  private copyIngredient = (ingredient: Ingredient) => Object.assign({}, ingredient);

  getIngredients = () => this.ingredients.map(this.copyIngredient);

  getIngredientAt = (index: number) => this.copyIngredient(this.ingredients[index]);

  addIngredient = (...ingredients: Ingredient[]) => {
    this.ingredients.push(...ingredients.map(this.copyIngredient));
    this.ingredientChange.next(this.getIngredients());
    return this;
  }

  changeIngredientAt = (ingredient: Ingredient, index: number) => {
    this.ingredients[index] = ingredient;
    this.ingredientChange.next(this.getIngredients());
    return this;
  }

  removeIngredientAt = (index: number) => {
    this.ingredients = this.ingredients.filter((el, i) => i !== index);
    this.ingredientChange.next(this.getIngredients());
    return this;
  }
}
