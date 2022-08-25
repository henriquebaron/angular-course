import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";

/* This core module pattern is actually useless in this project, and was made for demonstration
 * purposes only.
 * If services have to be declared on the "providers" of the App Module, a Core Module can be used
 * to concentrate all the services.
 * Still it is the better practice to always use "providedIn: 'root'" in services, so they are
 * available globally without having to declare them in the AppModule. The interceptor is an
 * exception of this rule, though. */
@NgModule({
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
})
export class CoreModule { }
