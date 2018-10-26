import { AppState } from 'src/app/store/app.reducers';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';

export interface FeatureState extends AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState = {
  recipes: [
    new Recipe(
      '1',
      'Halloween Bar',
      'This is a tasty halloween cookie bar.',
      'http://assets.kraftfoods.com/recipe_images/opendeploy/54852_640x428.jpg',
      [
        new Ingredient('sugar', 2),
        new Ingredient('bag of candy corn', 1)
      ]
    ),
    new Recipe(
      '2',
      'Chocolate Chip Cookies',
      'Classic favorite.',
      'https://images-gmi-pmc.edge-generalmills.com/087d17eb-500e-4b26-abd1-4f9ffa96a2c6.jpg',
      [
        new Ingredient('bag of chocolate chips', 1),
        new Ingredient('flour', 4),
        new Ingredient('butter', 1)
      ]
    ),
  ]
};

export function recipeReducer(state = initialState, action) {
  return state;
}
