import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed: boolean = true;
  isAuthenticated: boolean = false;
  private userSub: Subscription = new Subscription();

  constructor(private dataStorageService: DataStorageService, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        /* The trick of using two negations: the inner checks if the object is null. The outer negates this result. This is equivalent to
         !user ? false : true */
        this.isAuthenticated = !!user;
        console.log(!user);
        console.log(!!user);
      });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    // this.dataStorageService.fetchRecipes().subscribe();
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout())
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
