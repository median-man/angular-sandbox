import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

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

  private dataUrlWithAuth = () => `${this.DATA_URL}?auth=${this.authService.getToken()}`;

  storeRecipes() {
    return this.httpClient.put(this.dataUrlWithAuth(), this.recipeSvc.getRecipes());
  }

  getRecipes() {
    return this.httpClient
      .get<Recipe[]>(this.dataUrlWithAuth())
      .pipe(
        map(recipes => recipes.map(recipe => {
          if (!recipe.ingredients) {
            recipe.ingredients = [];
          }
          return recipe;
        })),
        tap(recipes => this.recipeSvc.setAll(recipes))
      );
  }
}
