import { Component, OnInit } from '@angular/core';

// Services
import { SidebarService } from '../../services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(private _sideBarService: SidebarService) { }

  ngOnInit() {
  }

}
