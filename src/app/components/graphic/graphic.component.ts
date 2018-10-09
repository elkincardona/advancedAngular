import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styles: []
})
export class GraphicComponent implements OnInit {

  @Input('data') data: number[] = [];
  @Input('labels') labels: string;
  @Input('chartType') chartType: string = '';

  constructor() { }

  ngOnInit() {
  }

}
