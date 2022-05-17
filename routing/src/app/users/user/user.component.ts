import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      /* Previously, only a "snapshot" of the route was being taken, therefore not updating the user
      object after the component was initialized */
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };
    /* But the Route.params property is an Observable, and let us subscribe to changes. */
    this.route.params.subscribe((params: Params) => {
      this.user.id = params['id'];
      this.user.name = params['name'];
    })
    /* Unless sure that the route will not change within the component itself, it is recommended to
    use the subscribe() method to the Route.params. */
  }

}
