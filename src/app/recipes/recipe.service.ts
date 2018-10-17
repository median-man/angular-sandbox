import { Injectable, EventEmitter } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Halloween Bar',
      'This is a tasty halloween cookie bar.',
      'http://assets.kraftfoods.com/recipe_images/opendeploy/54852_640x428.jpg',
      [
        new Ingredient('sugar', 2),
        new Ingredient('bag of candy corn', 1)
      ]
    ),
    new Recipe(
      'Chocolate Chip Cookies',
      'Classic favorite.',
      'https://images-gmi-pmc.edge-generalmills.com/087d17eb-500e-4b26-abd1-4f9ffa96a2c6.jpg',
      [
        new Ingredient('bag of chocolate chips', 1),
        new Ingredient('flour', 4),
        new Ingredient('butter', 1)
      ]
    ),
  ];

  getRecipes = () => [...this.recipes];
}
