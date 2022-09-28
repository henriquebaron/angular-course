import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  /* The BehaviorSubject works pretty much like the regular Subject, but the subscribers can access the value
   * of the last Subject update, even if they subscribed after the last update was triggered. */
  // user = new BehaviorSubject<User | null>(null);

  private tokenExpirationTimer: any;

  constructor(private store: Store<fromApp.AppState>) {}

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
    // }, 2000); // This can be used just for testing
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

}
