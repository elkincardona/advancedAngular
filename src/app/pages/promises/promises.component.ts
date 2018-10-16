import { Component, OnInit } from '@angular/core';
import { reject } from 'q';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  constructor() {

    this.countToThree().then(
      message => console.log('Finish', message)
    )
    .catch(
      error => console.log( 'Promise error', error)
    );

  }

  ngOnInit() {
  }

  countToThree(): Promise<boolean> {

    return new Promise( (resolve, reject) => {

      let count = 0;
      let interval = setInterval( () => {
        count += 1;
        console.log(count);
        if (count === 3) {
          resolve(true);
          // reject('simply error');
          clearInterval(interval);
        }

      }, 1000);


    });
  }

}
