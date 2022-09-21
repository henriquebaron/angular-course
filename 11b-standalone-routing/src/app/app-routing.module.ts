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
    /* Classic way of lazy loading routes: A whole module with the 
     * desired routes is loaded with the "loadChildren" function. Note
     * that the class is a "Module" */
    loadChildren: () =>
      import('./dashboard/dashboard-routing.module').then(
        (mod) => mod.DashboardRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
