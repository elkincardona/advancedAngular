import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styles: []
})
export class IncrementComponent implements OnInit {

  @Input('name') leyend: string = 'Leyend';
  @Input()  average: number = 50;
  @Output('changeOut') changeValueOutput: EventEmitter<number> = new EventEmitter();
  @ViewChild('txtProgressInput') txtProgressInput: ElementRef;
  constructor() {
    // console.log(`Leyend: ${this.leyend}`);
    // console.log(`Average: ${this.average}`);
  }

  ngOnInit() {
    // console.log(`Leyend:`, this.leyend);
    // console.log(`Average:`, this.average);
  }

  onChanges( newValue: number ) {

    // let elementInput: any = document.getElementsByName('progressInput')[0];

    if ( newValue >= 100) {
      this.average = 100;
    } else if ( newValue <= 0 ) {
      this.average = 0;
    } else {
      this.average = newValue;
    }
    // elementInput.value = this.average;
    this.txtProgressInput.nativeElement.value = this.average;
    this.changeValueOutput.emit(this.average);
  }


  changeValue( value: number ) {
    if (value < 0 && this.average + value < 0) {
      this.average = 0;
    } else if (value > 0 && this.average + value > 100) {
      this.average = 100;
    } else {
      this.average += value;
    }
    this.changeValueOutput.emit(this.average);
    this.txtProgressInput.nativeElement.focus();
  }
}
