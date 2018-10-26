import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';

import { RecipeBookComponent } from './recipes.component';
import { DetailComponent } from './detail/detail.component';
import { DetailPlaceholderComponent } from './detail-placeholder/detail-placeholder.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { RecipeListComponent } from './list/list.component';
import { ItemComponent } from './list/item/item.component';
import { recipeReducer } from './store/recipe.reducers';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    SharedModule,
    StoreModule.forFeature('recipes', recipeReducer),
  ],
  declarations: [
    RecipeBookComponent,
    RecipeListComponent,
    DetailComponent,
    DetailPlaceholderComponent,
    EditRecipeComponent,
    ItemComponent
  ]
})
export class RecipesModule { }
