import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /* As already seen before, @ViewChild allows to access data of a labeled reference in the HTML template.
  So it's an alternative way to access the form data. */
  @ViewChild('f') signupForm: NgForm;
  defaultQuestion: string = 'pet';
  answer: string = '';
  genders: string[] = ['male', 'female'];

  suggestUserName() {
    const suggestedName = 'Superuser';
    /* Two methods can be used to change the value of the form elements: NgForm.setValue and NgForm.patchValue. 
     * The former replaces the whole "value" property of the form with a copy of the object, which means that all the value
     * properties have to be written at once.
     * The latter allows to change single values, like done in the uncommented lines below. */
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male'
    // });
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }

  // onSubmit(form: NgForm): void {
  //   console.log(form);
  // }

  onSubmit(): void {
    console.log(this.signupForm);
  }
}
