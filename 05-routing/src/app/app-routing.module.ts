import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from "./auth-guard.service";
import { CanDeactivateGuardService } from "./servers/edit-server/can-deactivate-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ServerResolverService } from "./servers/server/server-resolver.service";

// Elements of the route preceded with a colon ":" are parameters, which can be fetched on the component, for example
const appRoutes: Routes = [
	{ path: '', component: HomeComponent },
	{
		path: 'users', component: UsersComponent, children: [
			{ path: ':id/:name', component: UserComponent },
		]
	},
	{
		path: 'servers',
		// canActivate: [AuthGuardService],
		canActivateChild: [AuthGuardService],
		component: ServersComponent, children: [
			/* Employing the resolver here. The data returned by the generic method resolve() is passed
			to the element named "server".
			Several resolvers can be declared within the curly braces, and all the elements will be available
			inside the "data" property of the Route. */
			{ path: ':id', component: ServerComponent, resolve: {server: ServerResolverService} },
			{ path: ':id/edit', canDeactivate: [CanDeactivateGuardService], component: EditServerComponent }
		]
	},
	// { path: 'not-found', component: PageNotFoundComponent },
	// The "data" element input here can be accessed by the component in the activated route
	{ path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
	/* The double-asterisk is a wildcard route, which catches any unexpected route.
	This must always be the LAST route of the array. All routes below ** will be redirected.
	We also used the property "redirectTo" to redirect the requests for this wildcard route
	to somewhere else. */
	/* Another note on redirecting: the "path" is matched by prefix, which means that Angular
	checks if the path *starts* with the given address. To avoid this, "pathMatch" can be
	set to 'full' */
	// { path: '**', redirectTo: '/not-found', pathMatch: 'full' }
	{ path: '**', redirectTo: '/not-found' }
]
/* The content which was before in the AppModule has been brought here. This is recommended
if the application has more than two or three routes.
Additionally to the "imports" to the NgModule decorator as seen before in the AppModule, it
is necessary to add the "exports" property to declare which imports of this module will be 
accessible to any other module that imports AppRoutingModule. */
@NgModule({
	imports: [
		/* useHash enables hash navigation, including a hash sign (#) between the domain name
		and the rest of the route. This is used for compatibility with older browsers or servers
		which cannot be configured to work with the "regular" route style. 
		More information for the server configuration will be shown on the deployment section of the course. */
		// RouterModule.forRoot(appRoutes, {useHash: true})
		RouterModule.forRoot(appRoutes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }