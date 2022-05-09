import { Component, Output } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { LoggingService } from '../logging.service';

/* This component uses two services, but has only one in the providers.
This is the usage of hierarchical injection. Here we want to share the same
instance of the AccountsService between the AppComponent and its child components. */
@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // To use a service properly, it must be added tot he providers of the component
  // The service was commented out from here because the LoggingService will be injected
  // into the AccountsService
  // providers: [LoggingService]
})
export class NewAccountComponent {
  // Dependency Injection must also be used to let Angular instantiate the service for the component.
  constructor(private loggingService: LoggingService, private accountsService: AccountsService) { }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsService.addAccount(accountName, accountStatus)
    // Then the service can be used normally.
    // this.loggingService.logStatusChange(accountStatus);
  }
}
