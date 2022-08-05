import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {

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

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    // return this.recipes.filter((recipe: Recipe) => { return recipe.id === id })[0];
    return this.recipes[index];
  }

  addIngredientsToShoppingList(recipe: Recipe): void {
    this.shoppingListService.addMultipleIngredients(recipe.ingredients);
  }

}
