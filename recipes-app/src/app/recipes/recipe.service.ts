import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import * as ShoppingListActions from '../shopping-list/store/shoppint-list.actions';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = []
  //   new Recipe('Test Recipe', 'This is just a test!', "../../../assets/images/limoncello.jpg", [
  //     new Ingredient('Lemon', 1),
  //     new Ingredient('Milk', 300)
  //   ]),
  //   new Recipe('Second test recipe', 'This is another test', "../../../assets/images/lasagna.jpg", [
  //     new Ingredient('Meat', 1),
  //     new Ingredient('Pasta sheet', 5)
  //   ])
  // ];

  constructor(private store: Store<{ ingredients: Ingredient[] }>) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    // return this.recipes.filter((recipe: Recipe) => { return recipe.id === id })[0];
    return this.recipes[index];
  }

  addIngredientsToShoppingList(recipe: Recipe): void {
    // this.shoppingListService.addMultipleIngredients(recipe.ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(recipe.ingredients));
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
