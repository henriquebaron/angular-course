import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Test Recipe', 'This is just a test!', "../../../assets/images/limoncello.jpg", [
      new Ingredient('Lemon', 1),
      new Ingredient('Milk', 300)
    ]),
    new Recipe('Second test recipe', 'This is another test', "../../../assets/images/lasagna.jpg", [
      new Ingredient('Meat', 1),
      new Ingredient('Pasta sheet', 5)
    ])
  ];

  constructor() { }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

}
