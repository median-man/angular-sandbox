import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      '1',
      'Halloween Bar',
      'This is a tasty halloween cookie bar.',
      'http://assets.kraftfoods.com/recipe_images/opendeploy/54852_640x428.jpg',
      [
        new Ingredient('sugar', 2),
        new Ingredient('bag of candy corn', 1)
      ]
    ),
    new Recipe(
      '2',
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

  getRecipeById = (id: string) => this.recipes.filter(recipe => recipe.id === id)[0];

  updateRecipe = (updatedRec: Recipe) => {
    this.recipes = this.recipes.map(
      (recipe: Recipe) => recipe.id === updatedRec.id ? updatedRec : recipe
    );
    this.recipesChanged.next(this.getRecipes());
    return this;
  }

  addRecipe = (values: any) => {
    const id = this.createId();
    const newRecipe = new Recipe(id, values.name, values.description, values.imagePath, values.ingredients);
    this.recipes = this.getRecipes().concat([newRecipe]);
    this.recipesChanged.next(this.getRecipes());
    return this.getRecipeById(id);
  }

  private createId = () => {
    const initialId = '1';
    const maxId = this.recipes.reduce((max, { id }) => id > max ? id : max, initialId);
    return (parseFloat(maxId) + 1).toString();
  }
}
