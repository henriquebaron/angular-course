import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

/* Interceptors have the purpose of changing a http request or response before they are sent from
 * or processed by the app.
 * This is useful, for example, to add parameters to a request (like an authentication token, for
 * example) without having to add it in every place I call the method for the HTTP request.
*/

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req.url);
    // I have to create a new request object, because the one passed in the argument is immutable.
    const modifiedRequest = req.clone({
      headers: req.headers.append("Auth", "xyz"),
    });
    // Finally, the newly created (and modified) copy of the request is sent
    return next.handle(modifiedRequest).pipe(tap(event => { // I always receive back an event here, so I have full control on what is coming
      if (event.type == HttpEventType.Response) {
        console.log('Response arrived. Body data:');
        console.log(event.body);
      }
    }));
  }
}
