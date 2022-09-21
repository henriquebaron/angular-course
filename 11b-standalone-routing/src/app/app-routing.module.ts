import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';

import { WelcomeComponent } from './welcome/welcome.component';

const routes: Route[] = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'about',
    /* Introduced in Angular 14: loading a single standalone component lazily
     * with the "loadComponent" function. Note the class is a "Component" */
    // component: AboutComponent,
    loadComponent: () => 
      import('./about/about.component').then(
        (mod) => mod.AboutComponent
      )
  },
  {
    path: 'dashboard',
    /* Introduced in Angular 14: loading a set of routes/components lazily, like
     * it was done when importing a routing module. Here the whole Module files were
     * replaced by a constant which contains the routes. All components there are
     * standalone. Note that the calling function is still "loadChildren" */
    loadChildren: () =>
      import('./dashboard/routes').then(
        (mod) => mod.DASHBOARD_ROUTES
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
