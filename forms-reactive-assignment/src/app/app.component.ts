import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  statusOptions: string[] = ['stable', 'critical', 'finished'];
  forbiddenProjectName: string[] = ['Test'];
  projectForm: FormGroup;

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      // 'projectName': new FormControl(null, [Validators.required, this.nameIsForbidden.bind(this)]),
      'projectName': new FormControl(null, Validators.required, this.nameIsForbiddenAsync.bind(this)),
      'projectStatus': new FormControl(this.statusOptions[0]),
      'email': new FormControl(null, [Validators.required, Validators.email])
    })
  }

  onSubmit(): void {
    console.log(this.projectForm);
    // this.projectForm.reset();
  }

  nameIsForbidden(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenProjectName.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true };
    }
    return null;
  }

  nameIsForbiddenAsync(control: FormControl): Promise<{ [s: string]: boolean }> | Observable<{ [s: string]: boolean }> {
    const promise = new Promise<{ [s: string]: boolean }>((resolve, reject) => {
      setTimeout(() => {
        if (this.forbiddenProjectName.includes(control.value)){
          resolve({ 'nameIsForbidden': true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

}
