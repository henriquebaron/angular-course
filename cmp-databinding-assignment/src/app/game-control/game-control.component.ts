import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  @Output() intervalElapsed = new EventEmitter<number>();
  intervalRef: any;
  secondsCount: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onStartGame(): void {
    this.intervalRef = setInterval(() => this.onIntervalElapsed(), 1000);
  }

  onStopGame(): void {
    clearInterval(this.intervalRef);
  }

  onIntervalElapsed(): void {
    this.secondsCount++;
    this.intervalElapsed.emit(this.secondsCount);
  }

}
