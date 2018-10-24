import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap, map, switchMap } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private DATA_URL = 'https://angular-sandbox-5fd45.firebaseio.com/recipes.json';

  constructor(
    private httpClient: HttpClient,
    private recipeSvc: RecipeService,
    private authService: AuthService
  ) {

  }

  private createRequestWithAuthParam(method: string, body?: any) {
    return from(this.authService.getToken())
      .pipe(switchMap(
        authToken => this.httpClient.request(
          method,
          this.DATA_URL,
          { body, params: new HttpParams().set('auth', authToken) }
        ))
      );
  }

  storeRecipes() {
    return this.createRequestWithAuthParam('put', this.recipeSvc.getRecipes());
  }

  getRecipes() {
    const withIngredients = recipe => {
      if (!recipe.ingredients) {
        recipe.ingredients = [];
      }
      return recipe;
    };
    return this.createRequestWithAuthParam('get').pipe(
      map((recipes: Recipe[]) => recipes.map(withIngredients)),
      tap(recipes => this.recipeSvc.setAll(recipes))
    );
  }
}
