import { Component, OnInit } from '@angular/core';

// Services
import { SidebarService, UserService } from '../../services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(private _sideBarService: SidebarService, public _userService: UserService) { }

  ngOnInit() {
  }

}
