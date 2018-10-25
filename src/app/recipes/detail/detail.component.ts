import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { AddIngredients } from 'src/app/shopping-list/store/shoping-list.actions';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './detail.component.html'
})

export class DetailComponent implements OnInit {
  recipe: Recipe;

  constructor(
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recipe = this.recipeService.getRecipeById(params['id']);
    });
  }

  addIngredientsToShoppingList = () => {
    this.store.dispatch(new AddIngredients(this.recipe.ingredients));
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.recipe.id);
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
