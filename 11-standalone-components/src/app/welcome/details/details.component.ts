import { Component } from '@angular/core';
import { AnalyticsService } from 'src/app/shared/analytics.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  standalone: true, // Set component to be standalone
  /* Since this component is now standalone, it does not consider anything
   * imported to the AppModule anymore. This includes the SharedModule (which
   * is necessary for the HighlightDirective used in the HTML template).
   * For this reason it has to be imported here */
  imports: [SharedModule],
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  constructor(private analyticsService: AnalyticsService) {}

  onClick() {
    this.analyticsService.registerClick();
  }
}
