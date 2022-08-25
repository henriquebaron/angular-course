import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

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
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const email = form.value.email;
      const password = form.value.password;

      let authObservable: Observable<AuthResponseData>;

      this.isLoading = true;
      authObservable = this.isLoginMode
        ? this.auth.login(email, password)
        : this.auth.signUp(email, password);
      authObservable.subscribe(
        (resData) => {
          console.log(resData);
          this.isLoading = false;
          this.router.navigate(['/recipes']);
        },
        (errorMessage) => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.showErrorAlert(errorMessage);
          this.isLoading = false;
        }
      );
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
