import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeBookComponent } from './recipes/recipes.component';
import { DetailComponent } from './recipes/detail/detail.component';
import { DetailPlaceholderComponent } from './recipes/detail-placeholder/detail-placeholder.component';
import { EditRecipeComponent } from './recipes/edit-recipe/edit-recipe.component';
import { SignupComponent } from './auth/signup/signup.component';
// import { SigninComponent } from './auth/signin/signin.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'recipes' },
  { path: 'signup', component: SignupComponent },
  // { path: 'signin', component: SigninComponent },
  { path: 'shopping-list', component: ShoppingListComponent },
  {
    path: 'recipes',
    component: RecipeBookComponent,
    children: [
      { path: '', pathMatch: 'full', component: DetailPlaceholderComponent },
      { path: 'new', component: EditRecipeComponent },
      { path: ':id', component: DetailComponent },
      { path: ':id/edit', component: EditRecipeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
