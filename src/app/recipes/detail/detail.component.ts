import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AddIngredients } from 'src/app/shopping-list/store/shoping-list.actions';
import { FeatureState } from '../store/recipe.reducers';
import { Recipe } from '../recipe.model';
import { DeleteRecipe } from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './detail.component.html'
})

export class DetailComponent implements OnInit {
  recipe: Observable<Recipe>;

  constructor(
    private store: Store<FeatureState>,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(this.setRecipeFromQueryParam.bind(this));
  }

  private setRecipeFromQueryParam(params: Params) {
    this.recipe = this.store
      .select('recipes')
      .pipe(
        map(({ recipes }) => recipes.filter(recipe => recipe.id === params['id'])[0]),
      );
  }

  addIngredientsToShoppingList = () => {
    this.recipe
      .pipe(take(1))
      .subscribe(recipe => this.store.dispatch(new AddIngredients(recipe.ingredients)));
  }



  onDelete() {
    this.recipe
      .pipe(take(1))
      .subscribe(recipe => this.store.dispatch(new DeleteRecipe(recipe.id)));
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
