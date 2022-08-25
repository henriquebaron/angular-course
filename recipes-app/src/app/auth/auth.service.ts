import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private url: string =
  //   'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBtJGxTeTbGwoDo5wogrYM7dMWLQ4hxuVU';
  private urlPrefix: string = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private urlPostfix: string = '?key=AIzaSyBtJGxTeTbGwoDo5wogrYM7dMWLQ4hxuVU';

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    let apiFunction = 'signUp';
    return this.http
      .post<AuthResponseData>(this.urlPrefix + apiFunction + this.urlPostfix, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError((errorResponse) => {
          let errorMessage = 'An unknown error occured!';
          if (errorResponse.error && errorResponse.error.error) {
            switch (errorResponse.error.error.message) {
              case 'EMAIL_EXISTS':
                errorMessage = 'This e-mail exists already.';
            }
          }
          return throwError(errorMessage);
        })
      );
  }

  login(email: string, password: string) {
    let apiFunction = 'signInWithPassword';
    return this.http.post<AuthResponseData>(this.urlPrefix + apiFunction + this.urlPostfix, {
      email: email,
      password: password,
      returnSecureToken: true,
    });
  }
}
