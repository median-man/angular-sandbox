import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Store } from '@ngrx/store';

import { AddIngredients, DeleteIngredient, UpdateIngredient } from '../store/shoping-list.actions';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './edit.component.html',
})

export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('editForm') form: NgForm;
  editMode = false;
  private editItemSub: Subscription;
  private editItemIndex: number;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{shoppingList: { ingredients: Ingredient[] } }>
  ) { }

  resetForm() {
    this.editMode = false;
    this.form.reset();
  }

  onSubmit(form: NgForm) {
    const { value: { name, amount } } = form;
    const ingredient = new Ingredient(name, amount);
    if (this.editMode) {
      const index = this.editItemIndex;
      this.store.dispatch(new UpdateIngredient({ index, ingredient }));
    } else {
      this.store.dispatch(new AddIngredients([ingredient]));
    }
    this.resetForm();
  }

  onDelete() {
    this.store.dispatch(new DeleteIngredient(this.editItemIndex));
    this.resetForm();
  }

  ngOnInit() {
    this.editItemSub = this.shoppingListService
      .editItem
      .subscribe((itemIndex: number) => {
        this.editMode = true;
        this.editItemIndex = itemIndex;
        const ingredient = this.shoppingListService.getIngredientAt(itemIndex);
        this.form.setValue(ingredient);
      });
  }

  ngOnDestroy() {
    this.editItemSub.unsubscribe();
  }
}
