import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  SharedService,
  SidebarService,
  SettingsService,
  UserService,
  LoginGuardGuard
} from './service.index';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SharedService,
    SidebarService,
    SettingsService,
    UserService,
    LoginGuardGuard
  ]
  ,
  declarations: []
})
export class ServiceModule { }
