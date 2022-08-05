import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServersService } from './servers.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  public servers: {id: number, name: string, status: string}[] = [];

  constructor(private serversService: ServersService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload(): void {
    /* Relative navigation: the Router.navigate method uses by default absolute paths.
    In order to navigate relatively, the option below must be used.
    For that, the ActivatedRoute object (with the route to the current component) was injected in the constructor. */
    // this.router.navigate(['servers'], {relativeTo: this.route});
  }

}
