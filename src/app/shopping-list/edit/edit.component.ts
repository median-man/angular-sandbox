import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './edit.component.html',
})

export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('editForm') form: NgForm;
  private editItemSub: Subscription;
  private editMode = false;
  private editItemIndex: number;

  constructor(private shoppingListService: ShoppingListService) { }

  resetForm() {
    this.editMode = false;
    this.form.reset();
  }

  onSubmit(form: NgForm) {
    const { value: { name, amount } } = form;
    const ingredient = new Ingredient(name, amount);
    if (this.editMode) {
      this.shoppingListService.changeIngredientAt(ingredient, this.editItemIndex);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }
    this.resetForm();
  }

  onDelete() {
    if (this.editMode) {
      this.shoppingListService.removeIngredientAt(this.editItemIndex);
    }
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
