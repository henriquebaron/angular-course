import { Component } from '@angular/core';
import { withLatestFrom } from 'rxjs-compat/operator/withLatestFrom';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
  styles: [`
    .changeColor {
      color: white;
    }
  `]
})
export class AppComponent {
  detailsVisible: boolean = false;
  entries: number[] = [];
  entryCount: number = 0;

  onDisplayDetails(): void {
    this.detailsVisible = !this.detailsVisible;
    this.entryCount++;
    this.entries.push(this.entryCount);
  }

  getBackgroundColor(entry: number): string {
    if (entry >= 5) return 'blue';
    else return 'transparent';
  }
}
