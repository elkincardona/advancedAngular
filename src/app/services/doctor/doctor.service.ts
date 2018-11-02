import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { servicesUrl } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { Doctor } from 'src/app/models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private _http: HttpClient, private _userService: UserService) { }

  loadDoctors(skip: number, limit: number) {
    let url = servicesUrl + '/doctor';
    url += `?skip=${skip}&limit=${limit}`;

    return this._http.get(url).pipe(
      map( (resp: any) => {
        return resp;
      })
    );
  }


  getDoctor(id: string) {
    const url = servicesUrl + '/doctor/' + id;

    // **** before angular 6 it was return this.http.post(url, user).map( (resp: any) => {return resp.user;});
    return this._http.get(url)
    .pipe(

      map( (resp: any) => {
        return resp.doctor;
      })

    );

  }


  search(term: string, from: number = 0, pageSize: number) {

    const url = servicesUrl + '/search/collection/doctors/' + term + '?skip=' + from.toString() + '&limit=' + pageSize.toString();

    // **** before angular 6 it was return this.http.post(url, user).map( (resp: any) => {return resp.user;});
    return this._http.get(url)
    .pipe(

      map( (resp: any) => {
        return resp;
      })

    );

  }

  deleteDoctor( id: string) {
    let url = servicesUrl + '/doctor/' + id;
    url += '?token=' + this._userService.token;

    // **** before angular 6 it was return this.http.post(url, user).map( (resp: any) => {return resp.user;});
    return this._http.delete( url );
  }

  createDoctor(doctor: Doctor) {
    let url = servicesUrl + '/doctor';

    if (doctor._id) {
      url += '/' + doctor._id;
      url += '?token=' + this._userService.token;
      return this._http.put(url, doctor).pipe(
        map( (resp: any) => {
          return resp.doctor;
        } )
      );

    } else {
      url += '?token=' + this._userService.token;
      return this._http.post(url, doctor).pipe(
        map( (resp: any) => {
          return resp.doctor;
        } )
      );
    }

  }



}
