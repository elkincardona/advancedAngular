
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;


  constructor() {

    // .pipe(
    //   retry(2) // Retry when there is error
    // )
      this.subscription = this.returnObservable()
      .subscribe(
      number => { console.log('Subscription:', number); }, // success
      error => { console.log('Subscription error:', error); }, // error
      () => { console.log('Observable finished'); } // Complete
      );



  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('the page is closed');
    this.subscription.unsubscribe();
  }


  returnObservable(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {
      let count = 0;
      const interval = setInterval( () => {
        count += 1;

        const returnval = {
          value: count
        };

        observer.next(returnval);

        // if (count === 3) {
        //   clearInterval(interval);
        //   observer.complete();
        // }
        // if (count === 2) { // Change up to 3 to see complete works, when is 2 the retry function works to simulate operation
        //   clearInterval(interval);
        //   observer.error('Auxilio');
        // }

      }, 1000);
    }).pipe(
      map( resp => resp.value ),
      filter( (value, index) => {
        // console.log('Filter', value, index);
        if ( (value % 2) === 1) {
          return true;
        } else {
          return false;
        }
      })
    );

  }

}
