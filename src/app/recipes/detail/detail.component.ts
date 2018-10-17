import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './detail.component.html'
})

export class DetailComponent implements OnInit {
  private recipe: Recipe;

  constructor(
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recipe = this.recipeService.getRecipeById(params['id']);
    });
  }

  addIngredientsToShoppingList = () => {
    this.shoppingListService.addIngredient(...this.recipe.ingredients);
  }
}
