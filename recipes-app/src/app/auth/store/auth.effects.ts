import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as AuthActions from './auth.actions';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  private urlPrefix: string =
    'https://identitytoolkit.googleapis.com/v1/accounts:';
  private urlPostfix: string = '?key=' + environment.firebaseAPIkey;

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
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
            map((resData) => {
              const expirationTime = new Date(
                new Date().getTime() + +resData.expiresIn * 1000
              );
              return new AuthActions.Login({
                email: resData.email,
                userId: resData.localId,
                token: resData.idToken,
                expirationDate: expirationTime,
              });
            }),
            catchError((error: HttpErrorResponse) =>
              of(new AuthActions.LoginFail(error.error.errorMessage))
            )
          );
      })
    )
  );

  // This effect does not yield any action. For that reason, a configuration object with
  // "dispatch" set to "false" has to be passed.
  authSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGIN),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );
}
