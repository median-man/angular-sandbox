import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-list-item',
  templateUrl: './item.component.html'
})

export class ItemComponent {
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  selectItem() {
    this.recipeService.recipeSelect.emit(this.recipe);
  }
}
