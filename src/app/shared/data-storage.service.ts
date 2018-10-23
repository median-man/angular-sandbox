import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, switchMap } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import { from, of } from 'rxjs';

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

  private dataUrlWithAuth = () => {
    const url = (token: string) => `${this.DATA_URL}?auth=${token}`;
    return from(this.authService.getToken()).pipe(map(url));
  }

  storeRecipes() {
    const request = (url: string) => this.httpClient
      .put(url, this.recipeSvc.getRecipes());
    return this.dataUrlWithAuth().pipe(switchMap(request));
  }

  getRecipes() {
    const withIngredients = recipe => {
      if (!recipe.ingredients) {
        recipe.ingredients = [];
      }
      return recipe;
    };
    const request = (url: string) => this.httpClient
      .get<Recipe[]>(url)
      .pipe(
        map(recipes => recipes.map(withIngredients)),
        tap(recipes => this.recipeSvc.setAll(recipes))
      );
    return this.dataUrlWithAuth().pipe(switchMap(request));
  }
}
