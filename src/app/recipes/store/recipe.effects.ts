import { HttpClient } from '@angular/common/http';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Effect, Actions } from '@ngrx/effects';

import {
  FETCH_RECIPES,
  SAVE_RECIPES,
  SetRecipes,
} from './recipe.actions';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FeatureState } from './recipe.reducers';

const DATA_URL = 'https://angular-sandbox-5fd45.firebaseio.com/recipes.json';

const addMissingPropsToRecipe = recipe => recipe.ingredients ? recipe : { recipe, ingredients: [] };

@Injectable()
export class RecipeEffects {
  @Effect()
  fetch$ = this.actions$
    .ofType(FETCH_RECIPES)
    .pipe(
      switchMap(() => this.httpClient.get(DATA_URL)),
      map((recipes: Recipe[]) => recipes.map(addMissingPropsToRecipe)),
      map((recipes: Recipe[]) => new SetRecipes(recipes)),
    );

  @Effect({ dispatch: false })
  save$ = this.actions$
    .ofType(SAVE_RECIPES)
    .pipe(
      withLatestFrom(this.store.select('recipes'), (action, { recipes }) => recipes),
      switchMap(recipes => this.httpClient.put(DATA_URL, recipes)),
    );

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<FeatureState>,
  ) { }
}
