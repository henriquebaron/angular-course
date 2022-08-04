import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
	ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

	getIngredients(): Ingredient[] {
		return this.ingredients.slice();
	}

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  addIngredient(newIngredient: Ingredient): void {
    this.ingredients.push(newIngredient);
		this.ingredientsChanged.next(this.ingredients.slice());
  }

  addMultipleIngredients(newIngredients: Ingredient[]): void {
    // this.ingredients = this.ingredients.concat(newIngredients);
    // Note on JavaScript: ... is a "spread operator". It spreads the array in a list of elements,
    // thus allowing to pass an array to the push() method.
    this.ingredients.push(...newIngredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient): void {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}