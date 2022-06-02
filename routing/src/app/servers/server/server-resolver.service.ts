import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ServersService } from '../servers.service';

interface Server { 
  id: number;
  name: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
/* The Resolver is loaded at first by Angular, before the route (and the component) gets rendered.
This is a good strategy to pass dinamically loaded data into the component, for example, fetching
external data from an API, which could take a bit longer to load. */
export class ServerResolverService implements Resolve<Server> {

  constructor(private serversService: ServersService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Server | Observable<Server> | Promise<Server> {
    /* No need for subscribing to the route here, since the Resolver is loaded every time the
    route is loaded, and not only once as in the Component. */
    return this.serversService.getServer(+route.params['id']);
  }
}
