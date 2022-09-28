import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import * as RecipeActions from '../store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {
    // this.recipe = this.recipeService.getRecipe(+route.snapshot.params['id']);
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.id = +params['id'];
          return this.store.select('recipes');
        }),
        map((recipeState) => {
          return recipeState.recipes.find(
            (recipe, index) => index === this.id
          );
        })
      )
      .subscribe((recipe) => (this.recipe = recipe));
  }

  onSendToShoppingList(): void {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onDelete(): void {
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
