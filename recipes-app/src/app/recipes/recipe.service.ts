import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
	private recipes: Recipe[] = [
    new Recipe('Test Recipe', 'This is just a test!',
      "../../../assets/images/limoncello.jpg"),
    new Recipe('Second test recipe', 'This is another test',
      "../../../assets/images/lasagna.jpg"),
  ];

  constructor() { }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

}
