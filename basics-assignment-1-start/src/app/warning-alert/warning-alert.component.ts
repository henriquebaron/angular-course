import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-warning-alert',
  template: '<h3>This is a warning message</h3>',
  // styleUrls: ['./warning-alert.component.css'],
  styles: [`
    h3 {
      color: yellow;
      background-color: #A0A0A0;
    }
  `]
})
export class WarningAlertComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
