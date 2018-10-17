import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-list-item',
  templateUrl: './item.component.html'
})

export class ItemComponent {
  @Input() recipe: Recipe;

  constructor() { }

}
