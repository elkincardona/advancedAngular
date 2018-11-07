import { Injectable } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
    menuOptions: any = [];

  // menuOptions: any = [
  //   {
  //     tittle: 'Main',
  //     icon: 'mdi mdi-gauge',
  //     submenus: [
  //       {tittle: 'Dashboard', icon: 'mdi mdi-gauge', url: '/dashboard'},
  //       {tittle: 'Progress bar', icon: 'mdi mdi-gauge', url: '/progress'},
  //       {tittle: 'Graphic', icon: 'mdi mdi-gauge', url: '/graphics1'},
  //       {tittle: 'Promises', icon: 'mdi mdi-gauge', url: '/promises'},
  //       {tittle: 'Rxjs', icon: 'mdi mdi-gauge', url: '/rxjs'}
  //     ]
  //   },
  //   {
  //     tittle: 'Admin',
  //     icon: 'mdi mdi-folder-lock-open',
  //     submenus: [
  //       {tittle: 'Users', icon: 'mdi mdi-gauge', url: '/users'},
  //       {tittle: 'Doctors', icon: 'mdi mdi-gauge', url: '/doctors'},
  //       {tittle: 'Hospitals', icon: 'mdi mdi-gauge', url: '/hospitals'}
  //     ]

  //   }
  // ];

  constructor(private _userService: UserService) {
   }


   loadMenu() {
    this.menuOptions = this._userService.menu;
   }

}
