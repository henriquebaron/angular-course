import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription = undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      /* Previously, only a "snapshot" of the route was being taken, therefore not updating the user
      object after the component was initialized */
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };
    /* But the Route.params property is an Observable, and let us subscribe to changes. */
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.user.id = params['id'];
      this.user.name = params['name'];
    })
    /* Unless sure that the route will not change within the component itself, it is recommended to
    use the subscribe() method to the Route.params. */
  }

  /* A note on good practice: The subscription used in the ngOnInit() method is not destroyed by the
  TypeScript interpreter automatically. It will reside in memory unless you unsubscribe.
  Angular does that automatically though. But still, for a sake of good practice, we were implementing
  OnDestroy() to unsubscribe manually. */
  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

}
