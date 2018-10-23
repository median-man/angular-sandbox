import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, switchMap } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import { from, of, Observable } from 'rxjs';

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

  private createRequest(method: string, body?: any) {
    const createUrl = (token: string) => `${this.DATA_URL}?auth=${token}`;
    const withAuth = () => from(this.authService.getToken()).pipe(map(createUrl));
    return withAuth().pipe(switchMap(url => this.httpClient[method](url, body)));
  }

  storeRecipes() {
    return this.createRequest('put', this.recipeSvc.getRecipes());
  }

  getRecipes() {
    const withIngredients = recipe => {
      if (!recipe.ingredients) {
        recipe.ingredients = [];
      }
      return recipe;
    };
    return this.createRequest('get').pipe(
      map((recipes: Recipe[]) => recipes.map(withIngredients)),
      tap(recipes => this.recipeSvc.setAll(recipes))
    );
  }
}
