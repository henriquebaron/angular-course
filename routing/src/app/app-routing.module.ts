import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// Elements of the route preceded with a colon ":" are parameters, which can be fetched on the component, for example
const appRoutes: Routes = [
	{ path: '', component: HomeComponent },
	{
		path: 'users', component: UsersComponent, children: [
			{ path: ':id/:name', component: UserComponent },
		]
	},
	{
		path: 'servers', component: ServersComponent, children: [
			{ path: ':id', component: ServerComponent },
			{ path: ':id/edit', component: EditServerComponent }
		]
	},
	{ path: 'not-found', component: PageNotFoundComponent },
	/* The double-asterisk is a wildcard route, which catches any unexpected route.
	This must always be the LAST route of the array. All routes below ** will be redirected.
	We also used the property "redirectTo" to redirect the requests for this wildcard route
	to somewhere else. */
	{ path: '**', redirectTo: '/not-found' }
]
/* The content which was before in the AppModule has been brought here. This is recommended
if the application has more than two or three routes.
Additionally to the "imports" to the NgModule decorator as seen before in the AppModule, it
is necessary to add the "exports" property to declare which imports of this module will be 
accessible to any other module that imports AppRoutingModule. */
@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }