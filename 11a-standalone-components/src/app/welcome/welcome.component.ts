import { Component } from '@angular/core';
import { DetailsComponent } from './details/details.component';

/* For the standalone "DetailsComponent" to be loaded, it has to
 * declared as an import to the component which is calling it. */ 
@Component({
  standalone: true,
  imports: [DetailsComponent],
  selector: 'app-welcome',
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent {}
