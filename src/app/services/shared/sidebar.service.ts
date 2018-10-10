import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menuOptions: any = [
    {
      tittle: 'Main',
      icon: 'mdi mdi-gauge',
      submenus: [
        {tittle: 'Dashboard', icon: 'mdi mdi-gauge', url: '/dashboard'},
        {tittle: 'Progress bar', icon: 'mdi mdi-gauge', url: '/progress'},
        {tittle: 'Graphic', icon: 'mdi mdi-gauge', url: '/graphics1'}
      ]
    }
  ];

  constructor() { }

}
