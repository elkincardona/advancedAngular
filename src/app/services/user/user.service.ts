import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { servicesUrl } from 'src/app/config/config';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;


  constructor(public http: HttpClient, private _router: Router) {
    this.loadStorage();
  }


  isLogged() {
    return (this.token) ? true : false;
  }

  loadStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.user = null;
    }
  }

  saveStorage(id: string, token: string, user: User) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
    this.token = token;
  }


  login (user: User, remember: boolean) {
    if (remember) {
        localStorage.setItem('email', user.email);
    } else {
        localStorage.removeItem('email');
    }

    const url = servicesUrl + '/login';

    // **** before angular 6 it was return this.http.post(url, user).map( (resp: any) => {return resp.user;});
    return this.http.post(url, user)
    .pipe(

      map( (resp: any) => {
        // localStorage.setItem('id', resp.user._id);
        // localStorage.setItem('token', resp.token);
        // localStorage.setItem('user', JSON.stringify(resp.user));
        this.saveStorage(resp.user._id, resp.token, resp.user);
        return true;
      })

    );
  }



  loginGoogle (token: string) {
    const url = servicesUrl + '/login/google';

    // **** before angular 6 it was return this.http.post(url, user).map( (resp: any) => {return resp.user;});
    return this.http.post(url, { token })
    .pipe(

      map( (resp: any) => {
        this.saveStorage(resp.user._id, resp.token, resp.user);
        return true;
      })

    );
  }


  logout() {
    this.user = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._router.navigate(['/login']);

  }

  createUser (user: User) {
    const url = servicesUrl + '/user';

    // **** before angular 6 it was return this.http.post(url, user).map( (resp: any) => {return resp.user;});
    return this.http.post(url, user)
    .pipe(

      map( (resp: any) => {
        swal("Importante", "Usuario creado correctamente", "success");
        return resp.user;
      })

    );
  }



}
