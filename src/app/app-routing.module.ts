import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeBookComponent } from './recipes/recipes.component';
import { DetailComponent } from './recipes/detail/detail.component';
import { DetailPlaceholderComponent } from './recipes/detail-placeholder/detail-placeholder.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'recipes' },
  { path: 'shopping-list', component: ShoppingListComponent },
  {
    path: 'recipes',
    component: RecipeBookComponent,
    children: [
      { path: '', pathMatch: 'full', component: DetailPlaceholderComponent },
      { path: ':id', component: DetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}