import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private firstObsSubscription: Subscription;
  count: number;

  constructor() {}

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(
    //   count => {
    //     console.log(count);
    //     this.count = count;
    //   }
    // );

    // Now let's create our own custom observable:
    const customObsInterval = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 2) { observer.complete(); }
        if (count > 3) {
          observer.error(new Error('Count is greater than 3!'));
        }
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customObsInterval.subscribe(
      next => {
        console.log(next);
        this.count = next;
      },
      error => {
        console.log(error);
      },
      () => {
        console.log('Completed!');
      }
    );
  }

  ngOnDestroy(): void {
    // We must clean up our own observable or it will continue to run even if we navigate away.
    // It can even start multiple threads that run in parallel. Memory leaks and resource issues.
    this.firstObsSubscription.unsubscribe();
  }
}
