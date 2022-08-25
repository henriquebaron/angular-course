import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take, Observable } from "rxjs";
import { AuthService } from "./auth.service";

// Reminder: Interceptors must be explictly declared in the App Module, in a special way
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /* Explanation: the operator "take" would take care of subscribing for exactly one output of the
    Subject and then unsubscribe automatically. The problem is: I would need to subscribe, and would have
    the user inside the response function. I couldn't return the http request from inside it.
    So I use the "exhaustMap" operator to chain two subscriptions together, changing the output type.
    With the operator, as soon as the data from the first subscription (user) is fetched, it is used
    as data for the result of the following subscription. */
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user ? user.token : '')
        })
        return next.handle(modifiedReq);
      })
    )
  }

}
