import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  // The template (intead of templateUrl) allows the input of the HTML code
  // directly on the TypeScript file.
  // The backtick string is a JavaScript feature that allows the input of 
  // multiline strings.
  template: `
  <app-server></app-server>
  <app-server></app-server>`,
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
