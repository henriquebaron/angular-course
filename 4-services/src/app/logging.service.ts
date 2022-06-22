import { Injectable } from "@angular/core";

/* Injectable here is not technically needed, since this service is only
being injected *into* another service.
But it is recommended to use Injectable in all services in Angular. */
@Injectable()
export class LoggingService {
	logStatusChange(status: string): void {
		console.log('A server status changed, new status: '+ status);
	}
}