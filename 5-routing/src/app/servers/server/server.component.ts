import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: { id: number, name: string, status: string };

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

  /* Using the resolver in this example does the same as the commented code below. The advantage
  is that the loading of the data happens asynchronously, letting the component load. */
  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.server = data['server'];
    })
    // Note: "+" works as a type cast operator (to number)
    // const id: number = +this.route.snapshot.params['id'];
    // this.server = this.serversService.getServer(id);
    // this.route.params.subscribe((params: Params) => {
    //   const id: number = +params['id'];
    //   this.server = this.serversService.getServer(id);
    // })
  }

  onEdit(): void {
    this.router.navigate(['edit'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }

}
