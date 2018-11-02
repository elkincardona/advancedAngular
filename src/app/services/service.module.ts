import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModaluploadService } from '../components/modalupload/modalupload.service';
import {
  SharedService,
  SidebarService,
  SettingsService,
  UserService,
  LoginGuardGuard,
  UploadFileService,
  HospitalService,
  DoctorService
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
    LoginGuardGuard,
    UploadFileService,
    ModaluploadService,
    

    UserService,
    HospitalService,
    DoctorService
  ]
  ,
  declarations: []
})
export class ServiceModule { }
