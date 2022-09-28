import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, pipe, switchMap } from "rxjs";
import { Recipe } from "../recipe.model";

import * as RecipeActions from './recipe.actions';

@Injectable()
export class RecipeEffects {
  private url: string =
    'https://ng-course-recipes-app-default-rtdb.firebaseio.com/';

  constructor(private actions$: Actions, private http: HttpClient) {}

  fetchRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.FETCH_RECIPES),
      switchMap(() => {
        return this.http.get<Recipe[]>(this.url + 'recipes.json');
      }),
      map((recipes) => {
        const recipesAdjusted = recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
        return new RecipeActions.SetRecipes(recipesAdjusted);
      })
    )
  );
}
