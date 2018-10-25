import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';
import { appGoogleClientId } from '../config/config';

declare function init_puglins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  remember: boolean = false;
  email: string;
  auth2: any;

  constructor(private _router: Router, private _userService: UserService) { }

  ngOnInit() {
    init_puglins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    this.remember = localStorage.getItem('email') ? true : false;
  }


  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: appGoogleClientId,
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignIn( document.getElementById('btnGoogle') );
    });


  }

  attachSignIn( element  ) {
    this.auth2.attachClickHandler( element, {}, (googleUser) => {
      //let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this._userService.loginGoogle(token).subscribe( resp => {
        console.log(resp);
        //this._router.navigate([ '/dashboard' ]);
        window.location.href = '#/dashboard';
      });

    });
  }



  appLogin( form: NgForm) {

    if ( form.invalid ) {
      return;
    }

    const user = new User(
      null,
      form.value.email,
      form.value.password
    );

    this._userService.login(user, form.value.remember)
    .subscribe( resp => {
        //this._router.navigate([ '/dashboard' ]);
        window.location.href = '#/dashboard';
    }, err => {
      swal("Importante", err.error.message, "error");
      // console.log(err);
   });

    // console.log('Login');
    // this._router.navigate([ '/dashboard' ]);
  }

}
