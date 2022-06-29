import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class UserService {
	/* Although the Subject works really similarly to the EventEmitter, it should be
	preferred over the latter.
	The Subject is suited for the Observable communication where the event has to be
	actively triggered somewhere else, like here, where it is triggered on the
	UserComponent.
	The EventEmitter still must be used when using the @Output decorator. */
	activatedEmitter = new Subject<boolean>();
}