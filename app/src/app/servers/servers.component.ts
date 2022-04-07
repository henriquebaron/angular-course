import { Component, OnInit } from '@angular/core';

@Component({
  // The component selector works like a CSS selector.
  // Therefore, there are many ways to declare how a component should be called in the HTML file.
  selector: 'app-servers', // As a specific HTML tag, the most common way to go
  // selector: '[app-servers]', // As an HTML attritbute
  // selector: '.app-servers', // As an HTML class
  // The template (intead of templateUrl) allows the input of the HTML code
  // directly on the TypeScript file.
  // The backtick string is a JavaScript feature that allows the input of 
  // multiline strings.
  // template: `
  // <app-server></app-server>
  // <app-server></app-server>`,
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer: boolean = false;

  constructor() { 
    setTimeout(() => {
      this.allowNewServer = true;
    },2000);
  }

  ngOnInit(): void {
  }

}
