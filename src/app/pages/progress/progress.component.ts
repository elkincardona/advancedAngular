import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  average1: number = 50;
  average2: number = 80;

  constructor() { }

  ngOnInit() {
  }

  // updateProgress(event: number) {
  //   console.log(event);
  //   this.average1 = event;
  // }


}
