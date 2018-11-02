import { Injectable } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { servicesUrl } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient, private _userService: UserService) {
  }

  getHospitals(from: number = 0, pageSize: number) {
    const url = servicesUrl + '/hospital?skip=' + from.toString() + '&limit=' + pageSize.toString();

    // **** before angular 6 it was return this.http.post(url, user).map( (resp: any) => {return resp.user;});
    return this.http.get(url)
    .pipe(

      map( (resp: any) => {
        return resp;
      })

    );

  }

  getHospital(id: string) {
    const url = servicesUrl + '/hospital/' + id;

    // **** before angular 6 it was return this.http.post(url, user).map( (resp: any) => {return resp.user;});
    return this.http.get(url)
    .pipe(

      map( (resp: any) => {
        return resp.hospital;
      })

    );

  }

  search(term: string, from: number = 0, pageSize: number) {
    const url = servicesUrl + '/search/collection/hospitals/' + term + '?skip=' + from.toString() + '&limit=' + pageSize.toString();

    // **** before angular 6 it was return this.http.post(url, user).map( (resp: any) => {return resp.user;});
    return this.http.get(url)
    .pipe(

      map( (resp: any) => {
        return resp;
      })

    );
  }

  createHospital(name: string) {
    let url = servicesUrl + '/hospital';
    url += '?token=' + this._userService.token;

    return this.http.post(url, {name}).pipe(
      map( (resp) => {
        return resp;
      } )
    );
  }

  updateHospital(hospital: Hospital) {
    let url = servicesUrl + '/hospital/' + hospital._id;
    url += '?token=' + this._userService.token;

    return this.http.put(url, hospital).pipe(
      map( (resp) => {
        return resp;
      } )
    );

  }

  deleteHospital(id: string) {
    let url = servicesUrl + '/hospital/' + id;
    url += '?token=' + this._userService.token;

    return this.http.delete(url).pipe(
      map( (resp) => {
        return resp;
      } )
    );
  }
}
