import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { FeatureState } from '../store/recipe.reducers';
import { UpdateRecipe, AddRecipe } from '../store/recipe.actions';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})

export class EditRecipeComponent implements OnInit {
  id: string;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private store: Store<FeatureState>,
    private route: ActivatedRoute,
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
      this.store
        .select('recipes')
        .pipe(take(1))
        .subscribe(({ recipes }) => {
          recipe = recipes.filter(({ id }) => id === this.id)[0];
          recipe.ingredients
            .map(this.createIngredientCtrl)
            .forEach(control => ingredientControls.push(control));
        });
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

  ingredientControls() {
    return (<FormArray>this.recipeForm.get('ingredients'));
  }

  onAddIngredient() {
    this.ingredientControls().push(this.createIngredientCtrl());
  }

  onSubmit() {
    const { name, imagePath, description, ingredients } = this.recipeForm.value;
    const recipe = new Recipe(this.id, name, description, imagePath, ingredients);

    if (this.editMode) {
      this.store.dispatch(new UpdateRecipe(recipe));
    } else {
      this.store.dispatch(new AddRecipe(recipe));
    }
  }

  onCancel() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  onRemoveIngredient(index: number) {
    this.ingredientControls().removeAt(index);
  }
}
