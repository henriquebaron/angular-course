import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;

  ngOnInit() {
    /* On the reactive forms, the validation is not done in the HTML template anymore. An array of references to methods of the
     * class Validators must be passed. */
    this.signupForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'gender': new FormControl('male')
    });
  }

  onSubmit() {
    // With the reactive approach, it is not needed to extra declare the form object, since it's inherently part of the component class
    console.log(this.signupForm);
  }

}
