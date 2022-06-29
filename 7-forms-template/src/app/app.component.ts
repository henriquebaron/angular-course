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
  }

  // onSubmit(form: NgForm): void {
  //   console.log(form);
  // }

  onSubmit(): void {
    console.log(this.signupForm);
  }
}
