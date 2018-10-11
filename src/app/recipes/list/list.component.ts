import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is just a test.',
      'http://assets.kraftfoods.com/recipe_images/opendeploy/54852_640x428.jpg'),
  ];

  constructor() { }

  ngOnInit() {
  }

}
