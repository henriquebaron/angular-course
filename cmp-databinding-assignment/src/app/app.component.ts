import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  numbers: number[] = [];

  onIntervalElapsed(secondsCount: number): void {
    this.numbers.push(secondsCount);
  }
}
