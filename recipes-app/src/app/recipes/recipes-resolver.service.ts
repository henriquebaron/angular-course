import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, take } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from './store/recipe.actions';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private recipeService: RecipeService, private store: Store<fromApp.AppState>, private actions$: Actions) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    // const recipes = this.recipeService.getRecipes();
    //  if (recipes.length === 0) {
    //   return this.dataStorageService.fetchRecipes();
    //  } else {
    //   return recipes;
    //  }

    /* It is also possible to use the Actions class outside the Effects class I created. An example is here, where I subscribe
     * to the execution of a specific action.
     * The 'take' operator is used to unsubscribe automatically after receiving one callback. */
    this.store.dispatch(new RecipeActions.FetchRecipes());
    return this.actions$.pipe(
      ofType(RecipeActions.SET_RECIPES),
      take(1)
    );
  }
}
