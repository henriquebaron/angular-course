import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

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
        'email': new FormControl(null, [Validators.required, Validators.email]),
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
      return { 'nameIsForbidden': true };
    }
    // In order for the input to be valid, the method must return "null". Returning e.g. { 'nameIsForbidden':  false } would not work
    return null;
  }

}
