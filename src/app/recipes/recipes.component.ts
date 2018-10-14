import { Component, OnInit } from '@angular/core';

import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})

export class RecipeBookComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is just a test.',
      'http://assets.kraftfoods.com/recipe_images/opendeploy/54852_640x428.jpg'),
    new Recipe(
      'Another Test',
      'This is just a test.',
      'http://assets.kraftfoods.com/recipe_images/opendeploy/54852_640x428.jpg'),
  ];

  selectedRecipe = null;

  ngOnInit() {
  }

  selectRecipe(recipe) {
    this.selectedRecipe = recipe;
  }
}
