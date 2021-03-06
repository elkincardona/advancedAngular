import { Component, OnInit } from '@angular/core';

// Services
import { SidebarService, UserService } from '../../services/service.index';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  user: User;

  constructor(public _sideBarService: SidebarService, public _userService: UserService) { }

  ngOnInit() {
    this.user = this._userService.user;
    this._sideBarService.loadMenu();
  }

}
