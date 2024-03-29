import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take, Observable, map } from "rxjs";
import { AuthService } from "./auth.service";
import * as fromApp from "../store/app.reducer";
import { Store } from "@ngrx/store";

// Reminder: Interceptors must be explictly declared in the App Module, in a special way
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /* Explanation: the operator "take" would take care of subscribing for exactly one output of the
    Subject and then unsubscribe automatically. The problem is: I would need to subscribe, and would have
    the user inside the response function. I couldn't return the http request from inside it.
    So I use the "exhaustMap" operator to chain two subscriptions together, changing the output type.
    With the operator, as soon as the data from the first subscription (user) is fetched, it is used
    as data for the result of the following subscription. */

    /* As the authService was replaced by the store to get the data, another "map" operation had to be
    added, to get the user from the Auth State object that gets returned by the Observable. */

    return this.store.select('auth').pipe(
      take(1),
      map(authState => {
        return authState.user;
      }),
      exhaustMap((user) => {
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user ? user.token : '')
        })
        return next.handle(modifiedReq);
      })
    )
  }

}
