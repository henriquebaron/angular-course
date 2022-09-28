import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private store: Store<fromApp.AppState>) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // return this.authService.user.pipe(
      return this.store.select('auth').pipe(
        take(1), // I only want to get the current user, while accessing the route. Unsubscribe right afterwards
        map((authState) => {
        if (!!authState.user) {
          return true;
        } else {
          return this.router.createUrlTree(['/auth']);
        }
      }))
  }

}
