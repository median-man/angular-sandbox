import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import { FeatureState } from '../store/recipe.reducers';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Observable<Recipe[]>;

  constructor(private store: Store<FeatureState>) { }

  ngOnInit() {
    this.recipes = this.store
      .select('recipes')
      .pipe(map(({ recipes }) => recipes));
  }
}
