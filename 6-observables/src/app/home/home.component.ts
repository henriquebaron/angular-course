import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;

  constructor() { }
  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe( count => {
    //   console.log(count);
    // })
    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 4) {
          observer.complete();
        }
        if (count > 5) {
          observer.error(new Error('Count is greater than 5!'));
        }
        count++;
      }, 1000);
    });

    /* Every observable provides the pipe() method, which can receive an unlimited amount
    of operators (which are imported above). These operators manipulate the data on the way
    between the observable and the observer that is subscribing. */
    this.firstObsSubscription = customIntervalObservable.pipe(filter((data: number) => {
      return data > 0;
    }), map((data: number) => {
      return 'Round: ' + (data + 1);
    })).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error.message);
    }, () => {
      console.log('Completed!');
    });
  }

  // Unsubscribing from observables is extremely important to avoid memory leaks.
  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }

}
