import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { servicesUrl } from 'src/app/config/config';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file/upload-file.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;
  menu: any = [];

  public getUser() {
    return this.user;

  }

  constructor(
    public http: HttpClient,
    private _router: Router,
    private _uploadService: UploadFileService) {
    this.loadStorage();
  }

  refreshToken() {
    let url = servicesUrl + '/login/refreshtoken';
    url += '?token=' + this.token;

    return this.http.get(url).pipe(
      map( (resp: any) => {
        console.log(resp);
        this.token = resp.token;
        localStorage.setItem('token', this.token);
        return true;
      }),
      catchError((err) => {
        swal("Error", "Error getting a new token", "error");
        this.logout();
        this._router.navigate(['/login']);
        return throwError(err);
      })
    );
  }

  isLogged() {
    return (this.token) ? true : false;
  }

  private loadStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.user = null;
      this.menu = [];
    }
  }

  private saveStorage(id: string, token: string, user: User, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.user = user;
    this.token = token;
    this.menu = menu;
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
        this.saveStorage(resp.user._id, resp.token, resp.user, resp.menu);
        return true;
      }),
      catchError((err) => {
        return throwError(err);
      })

    );
  }



  loginGoogle (token: string) {
    const url = servicesUrl + '/login/google';

    // **** before angular 6 it was return this.http.post(url, user).map( (resp: any) => {return resp.user;});
    return this.http.post(url, { token })
    .pipe(

      map( (resp: any) => {
        this.saveStorage(resp.user._id, resp.token, resp.user, resp.menu);
        return true;
      })

    );
  }


  logout() {
    this.user = null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('menu');
    this._router.navigate(['/login']);

  }

  createUser (user: User) {
    const url = servicesUrl + '/user';

    // **** before angular 6 it was return this.http.post(url, user).map( (resp: any) => {return resp.user;});
    return this.http.post(url, user)
    .pipe(

      map( (resp: any) => {
        swal("Important", "User created correctly", "success");
        return resp.user;
      })

    );
  }


  updateUser(user: User) {
    let url = servicesUrl + '/user/' + user._id;
    url += '?token=' + this.token;

    // **** before angular 6 it was return this.http.post(url, user).map( (resp: any) => {return resp.user;});
    return this.http.put(url, user)
    .pipe(

      map( (resp: any) => {
        swal("Important", "User updated correctly", "success");
        this.saveStorage(resp.user._id, this.token, resp.user, this.menu);
        return true;
      })

    );

  }



  updateProfileImage( file: File, id: string) {
      this._uploadService.uploadFile(file, 'users', id)
      .then( (resp: any) => {
        swal('Image updated', this.user.name, 'success');
        this.user.image = resp.users.image;
        this.saveStorage(this.user._id, this.token, this.user, this.menu);
      })
      .catch( err => {
          console.log(err);
      });
  }

  getUsers(from: number = 0, pageSize: number) {
    const url = servicesUrl + '/user?skip=' + from.toString() + '&limit=' + pageSize.toString();

    // **** before angular 6 it was return this.http.post(url, user).map( (resp: any) => {return resp.user;});
    return this.http.get(url)
    .pipe(

      map( (resp: any) => {
        return resp;
      })

    );

  }


  search(term: string, from: number = 0, pageSize: number) {

    const url = servicesUrl + '/search/collection/users/' + term + '?skip=' + from.toString() + '&limit=' + pageSize.toString();

    // **** before angular 6 it was return this.http.post(url, user).map( (resp: any) => {return resp.user;});
    return this.http.get(url)
    .pipe(

      map( (resp: any) => {
        return resp;
      })

    );

  }

  removeUser( id: string) {
    let url = servicesUrl + '/user/' + id;
    url += '?token=' + this.token;

    // **** before angular 6 it was return this.http.post(url, user).map( (resp: any) => {return resp.user;});
    return this.http.delete( url );
  }


  updateRole( user: User) {

    let url = servicesUrl + '/user/' + user._id;
    url += '?token=' + this.token;

   // **** before angular 6 it was return this.http.post(url, user).map( (resp: any) => {return resp.user;});
   return this.http.put(url, user)
   .pipe(

     map( (resp: any) => {
       if (this.user._id === user._id) {
        this.saveStorage(resp.user._id, this.token, resp.user, this.menu);
       }
       return true;
     })

   );
  }


}
