import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error?: string = undefined;
  /* Gather the reference of the first (and in this case only) use of the PlaceholderDirective in the template.
  This directive was created exposing the ViewContainerRef of the element calling the directive. */
  // ! after the variable name is a "null-assertion operator", that tells the compiler that "I'm sure this expression won't be null or undefined"
  @ViewChild(PlaceholderDirective) alertHost!: PlaceholderDirective;

  private closeSub: Subscription = new Subscription();

  // constructor(private auth: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {}
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) this.showErrorAlert(this.error);
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const email = form.value.email;
      const password = form.value.password;

      this.isLoading = true;
      if (this.isLoginMode) {
        this.store.dispatch(
          new AuthActions.LoginStart({ email: email, password: password })
        );
      } else {
        this.store.dispatch(
          new AuthActions.SignupStart({ email: email, password: password })
        );
      }

      form.reset();
    }
  }

  onHandleError() {
    this.error = undefined;
  }

  private showErrorAlert(message: string) {
    // Older versions of Angular needed a factory to instantiate new components through the code.
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear(); // Clear any previously rendered component here.
    const componentRef = hostViewContainerRef.createComponent(AlertComponent);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
