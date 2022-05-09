import { Component, OnInit } from '@angular/core';
import { AccountsService } from './accounts.service';

/* A note on service instantiation:
Angular does a hierarchical injection of service instances:
- Service instances declared on the AppModule are shared application-wide;
- Service instances declared on the AppComponent (like here, on the "providers" property) are
  shared between all components (but not for the services of the app)
- Service instances declared on the components are available to the component and its child components. */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  accounts: { name: string, status: string }[] = [];

  constructor(private accountsService: AccountsService) { }

  ngOnInit(): void {
    this.accounts = this.accountsService.accounts;
  }
}
