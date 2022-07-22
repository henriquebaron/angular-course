import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('userForm') formData: NgForm;
  defaultSubscription: string = 'advanced';

  onSubmit(): void {
    console.log(this.formData);
  }

}
