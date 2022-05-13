import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
	ingredientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

	getIngredients(): Ingredient[] {
		return this.ingredients.slice();
	}

  addIngredient(newIngredient: Ingredient): void {
    this.ingredients.push(newIngredient);
		this.ingredientsChanged.emit(this.ingredients.slice());
  }
}