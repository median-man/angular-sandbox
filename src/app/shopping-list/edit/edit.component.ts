import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/store/app.reducers';
import { Ingredient } from '../../shared/ingredient.model';

import {
  AddIngredients,
  DeleteIngredient,
  UpdateIngredient,
  CloseIngredient,
} from '../store/shoping-list.actions';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './edit.component.html',
})

export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('editForm') form: NgForm;
  editMode = false;
  private editItemSub: Subscription;

  constructor(private store: Store<AppState>) { }

  resetForm() {
    this.editMode = false;
    this.store.dispatch(new CloseIngredient());
    this.form.reset();
  }

  onSubmit(form: NgForm) {
    const { value: { name, amount } } = form;
    const ingredient = new Ingredient(name, amount);
    if (this.editMode) {
      this.store.dispatch(new UpdateIngredient({ ingredient }));
    } else {
      this.store.dispatch(new AddIngredients([ingredient]));
    }
    this.resetForm();
  }

  onDelete() {
    this.store.dispatch(new DeleteIngredient());
    this.resetForm();
  }

  ngOnInit() {
    this.editItemSub = this.store
      .select('shoppingList')
      .subscribe(data => this.onData(data));
  }

  onData(data) {
    if (data.editItemAt > -1) {
      this.editMode = true;
      this.form.setValue(data.editIngredient);
    } else {
      this.editMode = false;
    }
  }

  ngOnDestroy() {
    if (this.editMode) {
      this.resetForm();
    }
    this.editItemSub.unsubscribe();
  }
}
