import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';

// To employ user-defined routes with standalone components
@Component({
  standalone: true,
  // RouterModule is imported for things like the <router-outlet> element to be available
  imports: [WelcomeComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
