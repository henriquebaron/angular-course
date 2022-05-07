import { Component, Output } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { LoggingService } from '../logging.service';

/* The creation and change of services in this app does not work in this commit
because the AccountsService was declared on the providers of all the components.
For the data to be shared (like it's needed in this case), the service must be
declared only in the parent component. */
@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // To use a service properly, it must be added tot he providers of the component
  providers: [LoggingService, AccountsService]
})
export class NewAccountComponent {
  // Dependency Injection must also be used to let Angular instantiate the service for the component.
  constructor(private loggingService: LoggingService, private accountsService: AccountsService) { }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsService.addAccount(accountName, accountStatus)
    // Then the service can be used normally.
    this.loggingService.logStatusChange(accountStatus);
  }
}
