import { Component, OnInit } from '@angular/core';

// *******
// Call javascript functions outside angular
// *******
declare function init_puglins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_puglins();
  }

}
