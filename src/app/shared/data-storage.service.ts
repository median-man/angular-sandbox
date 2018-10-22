import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private DATA_URL =  'https://angular-sandbox-5fd45.firebaseio.com/recipes.json';

  constructor(private httpClient: HttpClient, private recipeSvc: RecipeService) { }

  storeRecipes() {
    return this.httpClient.put(this.DATA_URL, this.recipeSvc.getRecipes());
  }

  getRecipes() {
    return this.httpClient
      .get<Recipe[]>(this.DATA_URL)
      .pipe(
        tap(recipes => this.recipeSvc.setAll(recipes))
      );
  }
}
