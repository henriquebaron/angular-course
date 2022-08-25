import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesResolverService } from './recipes-resolver.service';
import { RecipesComponent } from './recipes.component';

/* When enabling lazy loading, the first path was changed from 'recipes' to ''.
 * That's because once the module is lazy-loaded, the application is already on the
 * '/recipes' route. So all the routes declared below will be relative to '/recipes' */
const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipeStartComponent },
      // Order is important! ":id" before "new" does not work!
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService],
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipesResolverService],
      },
    ],
  },
];

@NgModule({
  // The insertion of the routes is done only once with "forRoot", in the App Module.
  // In all the other modules, "forChild" should be used.
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule], // This export is necessary because the Router Module is used by the Recipes Module
})
export class RecipesRoutingModule {}
