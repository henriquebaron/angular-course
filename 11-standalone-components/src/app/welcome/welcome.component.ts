import { Component } from '@angular/core';
// import { DetailsComponent } from './details/details.component';

/* For the new standalone "DetailsComponent" to be loaded, it has to
 * declared as an import to the component which is calling it. But this
 * only works if the calling component is also standalone.
 * That is not the case for the WelcomeComponent as of now. */
@Component({
  // imports: [DetailsComponent],
  selector: 'app-welcome',
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent {}
