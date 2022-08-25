import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { User } from './user.model';

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
  private urlPrefix: string =
    'https://identitytoolkit.googleapis.com/v1/accounts:';
  private urlPostfix: string = '?key=AIzaSyBtJGxTeTbGwoDo5wogrYM7dMWLQ4hxuVU';

  /* The BehaviorSubject works pretty much like the regular Subject, but the subscribers can access the value
   * of the last Subject update, even if they subscribed after the last update was triggered. */
  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    let apiFunction = 'signUp';
    return this.http
      .post<AuthResponseData>(this.urlPrefix + apiFunction + this.urlPostfix, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((responseData) =>
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn * 1000
          )
        )
      );
  }

  login(email: string, password: string) {
    let apiFunction = 'signInWithPassword';
    return this.http
      .post<AuthResponseData>(this.urlPrefix + apiFunction + this.urlPostfix, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((responseData) =>
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn * 1000
          )
        )
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData') ?? ''); // Null coalescing operator, since I'm working in 'strict' mode
    if (!userData) return;
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  private handleError(errorResponse: HttpErrorResponse) {
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
    return throwError(() => new Error(errorMessage));
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate: Date = new Date(new Date().getTime() + expiresIn);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
