import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private changeCount: number = 0;

  constructor() { }

  registerChange(): void {
    this.changeCount++;
    console.log('Number of changes: ' + this.changeCount);
  }
}
