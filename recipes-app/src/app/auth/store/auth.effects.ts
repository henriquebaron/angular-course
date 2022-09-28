import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

function handleAuthentication(resData: AuthResponseData) {
  const email = resData.email;
  const localId = resData.localId;
  const token = resData.idToken;

  const expirationTime = new Date(
    new Date().getTime() + +resData.expiresIn * 1000
  );
  const user = new User(email, localId, token, expirationTime);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    email: email,
    userId: localId,
    token: token,
    expirationDate: expirationTime,
  });
}

function handleErrorResponse(errorResponse: HttpErrorResponse) {
  let errorMessage = 'An unknown error occurred!';
  if (errorResponse.error && errorResponse.error.error) {
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This e-mail exists already.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This e-mail does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is incorrect.';
    }
  }
  return errorMessage;
}

@Injectable()
export class AuthEffects {
  private urlPrefix: string =
    'https://identitytoolkit.googleapis.com/v1/accounts:';
  private urlPostfix: string = '?key=' + environment.firebaseAPIkey;

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private service: AuthService
  ) {}

  authLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((authData: AuthActions.LoginStart) => {
        let apiFunction = 'signInWithPassword';
        return this.http
          .post<AuthResponseData>(
            this.urlPrefix + apiFunction + this.urlPostfix,
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((resData) => {
              this.service.setLogoutTimer(+resData.expiresIn * 1000);
            }),
            map((resData) => handleAuthentication(resData)),
            /* In contrast to the "handleError" method of the AuthService,
             * the "catchError" should never throw an error (with the "throw"
             * function). This would break the observable and stop it from running.
             * In contrast to observables implemented in regular services, the
             * observables of NgRx are ongoing: they life during the entire lifecycle
             * of the application. If an error is thrown, it will be broken and won't
             * be respawned. */
            catchError((response: HttpErrorResponse) => {
              let errorMessage = handleErrorResponse(response);
              return of(new AuthActions.AuthenticateFail(errorMessage));
            })
          );
      })
    )
  );

  // This effect does not yield any action. For that reason, a configuration object with
  // "dispatch" set to "false" has to be passed.
  authRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  authSignup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SIGNUP_START),
      switchMap((signupAction: AuthActions.SignupStart) => {
        let apiFunction = 'signUp';
        return this.http
          .post<AuthResponseData>(
            this.urlPrefix + apiFunction + this.urlPostfix,
            {
              email: signupAction.payload.email,
              password: signupAction.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((resData) => {
              this.service.setLogoutTimer(+resData.expiresIn * 1000);
            }),
            map((resData) => handleAuthentication(resData)),
            catchError((response: HttpErrorResponse) => {
              let errorMessage = handleErrorResponse(response);
              return of(new AuthActions.AuthenticateFail(errorMessage));
            })
          );
      })
    )
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.AUTO_LOGIN),
      map(() => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData') ?? '{}'); // Null coalescing operator, since I'm working in 'strict' mode
        if (!userData) return { type: 'NOTHING'};
        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate)
        );

        const expirationTime = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        if (loadedUser.token) {
          this.service.setLogoutTimer(expirationTime);
          return new AuthActions.AuthenticateSuccess({
            email: loadedUser.email,
            userId: loadedUser.id,
            token: loadedUser.token,
            expirationDate: new Date(userData._tokenExpirationDate),
          });
        } else return { type: 'NOTHING'};
      })
    )
  );

  authLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
          this.service.clearLogoutTimer();
          localStorage.removeItem('userData');
          /* The redirection has been moved here to explicitly redirect to '/auth'.
           * Redirecting after logout in the Redirect effect caused a race contition
           * in which the state of the application still did not have the user with
           * the 'null' value when it was tested in the AuthGuard. That caused the
           * app to allow the user to remain in the 'recipes' page after logout. */
          this.router.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );

}
