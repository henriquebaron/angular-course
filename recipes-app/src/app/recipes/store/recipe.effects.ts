import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, pipe, switchMap, tap, withLatestFrom } from 'rxjs';
import { Recipe } from '../recipe.model';

import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {
  private url: string =
    'https://ng-course-recipes-app-default-rtdb.firebaseio.com/';

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}

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

  storeRecipes$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipeActions.STORE_RECIPES),
        /* This effect needed to access values from the store itself. For that, the
         * 'withLatestFrom' operator can be used, to fetch the latest value from the
         * observable given as argument.
         * Together with that, it demonstrates that it's possible to call the store from
         * the effects, just injecting it normally in the constructor, like in any other
         * class. */
        withLatestFrom(this.store.select('recipes')),
        tap(([actionData, recipesState]) => {
          this.http
            .put(this.url + 'recipes.json', recipesState.recipes)
            .subscribe((response) => {
              console.log(response);
            });
        })
      ),
    { dispatch: false }
  );
}
