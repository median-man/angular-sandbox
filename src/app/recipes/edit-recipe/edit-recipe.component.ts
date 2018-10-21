import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})

export class EditRecipeComponent implements OnInit {
  id: string;
  editMode = false;
  private recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = typeof params['id'] !== 'undefined';
      this.initForm();
    });
  }

  private initForm() {
    let recipe: Recipe;
    const ingredientControls = new FormArray([]);

    if (this.editMode) {
      recipe = this.recipeService.getRecipeById(this.id);

      recipe.ingredients
        .map(this.createIngredientCtrl)
        .forEach(control => ingredientControls.push(control));
    } else {
      recipe = new Recipe('', '', '', '', []);
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipe.name, Validators.required),
      'imagePath': new FormControl(recipe.imagePath, Validators.required),
      'description': new FormControl(recipe.description, Validators.required),
      'ingredients': ingredientControls
    });
  }

  private createIngredientCtrl(ingredient?: Ingredient) {
    const name = ingredient ? ingredient.name : null;
    const amount = ingredient ? ingredient.amount : null;
    return new FormGroup({
      'name': new FormControl(name, Validators.required),
      'amount': new FormControl(amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(this.createIngredientCtrl());
  }

  onSubmit() {
    const { name, imagePath, description, ingredients } = this.recipeForm.value;
    const recipe = new Recipe(this.id, name, description, imagePath, ingredients);
    let navPath = '../';

    if (this.editMode) {
      this.recipeService.updateRecipe(recipe);
    } else {
      recipe.id = this.recipeService.addRecipe(recipe).id;
      navPath += recipe.id;
    }

    this.router.navigate([navPath], { relativeTo: this.route });
  }

  onCancel() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  onRemoveIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
