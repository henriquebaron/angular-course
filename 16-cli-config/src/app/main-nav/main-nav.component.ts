import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

/* This component was generated automatically by the CLI, but through the Angular Material package.
 * The CLI does not only support the traditional generate command like:
 *    ng generate component [name]
 * but also
 *    ng generate @angular/material:navigation [name]
 *
 * It is possible because the Angular Material package is installed, and the name after the 'generate'
 * command represents the 'schematic' which defines this command or option.
 * It is a demonstration of how schematics can help. An empty set of schematics is also present in
 * this project's angular.json file (around line 8). Certain third party packages define their own
 * schematics, enabling new commands for the Angular CLI. */

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

}
