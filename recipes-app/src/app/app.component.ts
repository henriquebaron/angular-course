import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>, @Inject(PLATFORM_ID) private platformId) { }

  ngOnInit(): void {
    // this.authService.autoLogin();
    /* Because of Angular Universal, the app is initially run in the NodeJS server. The Login functionality
     * calls 'localStorage' functions though, which are only available in the browser API. For that reason,
     * I must check if the application is running in a browser before calling the auto login action. */
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(new AuthActions.AutoLogin());
    }
  }

}
