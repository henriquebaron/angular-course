import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

/* This is the external service which holds the CanDeactivate Guard.
It is called automatically by Angular for the EditServerComponent
(through the route definition in the AppRoutingModule).
The CanComponentDeactivate interface declared above and used in the generic type
allows to transfer the decision of deactivation to the implementing component.
See the EditServerComponent for details. */
export class CanDeactivateGuardService implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return component.canDeactivate();
  }
}