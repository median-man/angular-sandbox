import { Injectable, EventEmitter } from '@angular/core';

import { Recipe } from './recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipeSelect = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is just a test.',
      'http://assets.kraftfoods.com/recipe_images/opendeploy/54852_640x428.jpg'),
    new Recipe(
      'Another Test',
      'This is just a test.',
      'http://assets.kraftfoods.com/recipe_images/opendeploy/54852_640x428.jpg'),
  ];

  getRecipes = () => [...this.recipes];
}
