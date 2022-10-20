import { Component } from '@angular/core';

/* This is an example of the usage of 'projects' in an Angular environment.
 * This project named 'backend' was created with the command
 *    ng generate application backend
 *
 * It shows that an Angular folder structure can actually contain multiple
 * projects, which can be applications or libraries.
 *
 * The structure now looks a bit cumbersome: we have an app on the root folder
 * which contains an application, and another projects/ folder structure with
 * the new application.
 * For that reason, the best way to start an Angular project when we know that
 * it will contain several projects (applications/libraries) is to initialize
 * the Angular 'ecosystem' without an application i.e. run at the very beginning
 *    ng new [workspace-name] --create-application=false
 * instead of
 *    ng new [workspace-name].
 *  */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'backend';
}
