import { Component, Input } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './detail.component.html'
})

export class DetailComponent {
  @Input() recipe: Recipe;
}
