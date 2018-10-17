import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list/edit/edit.component';
import { RecipeBookComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/list/list.component';
import { ItemComponent } from './recipes/list/item/item.component';
import { DetailComponent } from './recipes/detail/detail.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { DetailPlaceholderComponent } from './recipes/detail-placeholder/detail-placeholder.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    RecipeBookComponent,
    RecipeListComponent,
    ItemComponent,
    DetailComponent,
    DropdownDirective,
    DetailPlaceholderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
