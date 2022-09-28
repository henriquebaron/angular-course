import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscription: Subscription = new Subscription();

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    // this.subscription = this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
    // 	this.recipes = recipes;
    // });
    // this.recipes = this.recipeService.getRecipes();

    /* Here the data is obtained differently from the shopping list component. There, the
     * element array was replaced by a subscription which recturned the array. For that to work,
     * an async pipe has been used in the HTML template. */
    this.subscription = this.store.select('recipes').subscribe((state) => {
      this.recipes = state.recipes;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
