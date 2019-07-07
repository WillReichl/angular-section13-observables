import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private firstObsSubscription: Subscription;
  count: number;

  constructor() { }

  ngOnInit() {
    this.firstObsSubscription = interval(1000).subscribe(
      count => {
        console.log(count);
        this.count = count;
      }
    );
  }

  ngOnDestroy(): void {
    // We must clean up our own observable or it will continue to run even if we navigate away.
    // It can even start multiple threads that run in parallel. Memory leaks and resource issues.
    this.firstObsSubscription.unsubscribe();
  }
}
