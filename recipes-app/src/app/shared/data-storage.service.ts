import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private url: string =
    'https://ng-course-recipes-app-default-rtdb.firebaseio.com/';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.url + 'recipes.json', recipes).subscribe((response) => {
      console.log(response);
    });
  }

  fetchRecipes() {
    /* Explanation: the operator "take" would take care of subscribing for exactly one output of the
    Subject and then unsubscribe automatically. The problem is: I would need to subscribe, and would have
    the user inside the response function. I couldn't return the recipes and components from inside it.
    So I use the "exhaustMap" operator to chain two subscriptions together, changing the output type.
    With the operator, as soon as the data from the first subscription (user) is fetched, it is used
    as data for the result of the following subscription. */
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<Recipe[]>(this.url + 'recipes.json',
        {
          params: new HttpParams().set('auth', user ? user.token : '')
        });
      }),
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
