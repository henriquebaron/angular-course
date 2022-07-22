import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  get hobbyControls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  ngOnInit() {
    /* On the reactive forms, the validation is not done in the HTML template anymore. An array of references to methods of the
     * class Validators must be passed. */
    this.signupForm = new FormGroup({
      // The reactive approach allows the nesting of controls using FormGroup objects inside each other.
      'userData': new FormGroup({
        /* The reference of the customer validator is passed. But I have to manually bind it to my 
         * component, because the method is not executed inside the component, but by Angular. */
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        /* The next argument of the constructor of FormControl is the place to input the asynchronous validators.
         * In this case it is not necessary to bind: the validator method does not access any element of the component (this.<element>) */
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }

  onSubmit() {
    // With the reactive approach, it is not needed to extra declare the form object, since it's inherently part of the component class
    console.log(this.signupForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  // Return type of the custom validator is a JS key-value-pair object.
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      /* This key-value pair is added to the "errors" element of the control object.
       * (This is why you should return "null" if there is no validation errors) */
      return { 'nameIsForbidden': true };
    }
    // In order for the input to be valid, the method must return "null". Returning e.g. { 'nameIsForbidden':  false } would not work
    return null;
  }

  // Asynchronous validators, as any asynchronous function, return Promise or Observable
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ 'emailIsForbidden': true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

}
