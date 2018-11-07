import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { servicesUrl } from '../../config/config';
import { User } from 'src/app/models/user.model';
import { Hospital } from 'src/app/models/hospital.model';
import { Doctor } from 'src/app/models/doctor.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

   users: User[] = [];
   hospitals: Hospital[] = [];
   doctors: Doctor[] = [];

  constructor(private _activatedRouter: ActivatedRoute, private _http: HttpClient) {
    _activatedRouter.params.subscribe( params => {
        let term = params.term;
        this.search(term);
    });
   }

  ngOnInit() {
  }

  search(term: string) {
    let url = servicesUrl + '/search/all/' + term;
    this._http.get(url).subscribe( (resp: any) => {
      this.hospitals = resp.hospitals;
      this.doctors = resp.doctors;
      this.users = resp.users;
    });


  }

}
