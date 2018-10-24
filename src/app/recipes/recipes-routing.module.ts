import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '../auth/auth-guard.service';

import { RecipeBookComponent } from './recipes.component';
import { DetailPlaceholderComponent } from './detail-placeholder/detail-placeholder.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: 'recipes',
    component: RecipeBookComponent,
    children: [
      { path: '', pathMatch: 'full', component: DetailPlaceholderComponent },
      {
        path: 'new',
        component: EditRecipeComponent,
        canActivate: [AuthGuardService]
      },
      { path: ':id', component: DetailComponent },
      {
        path: ':id/edit',
        component: EditRecipeComponent,
        canActivate: [AuthGuardService]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RecipesRoutingModule {

}
