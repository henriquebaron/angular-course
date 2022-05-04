import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Recipe } from "../recipe.model";

@Component({
	selector: 'app-recipe-list',
	templateUrl: './recipe-list.component.html',
	styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
	@Output() recipeSelected = new EventEmitter<Recipe>();
	recipes: Recipe[] = [
		new Recipe('Test Recipe', 'This is just a test!',
		"../../../assets/images/limoncello.jpg"),
		new Recipe('Second test recipe', 'This is another test',
		"../../../assets/images/lasagna.jpg"),
	];

	constructor() { }

	ngOnInit(): void {

	}

	onItemClicked(recipe: Recipe): void {
		this.recipeSelected.emit(recipe);
	}
}