import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/service.index';
import { Doctor } from 'src/app/models/doctor.model';
import { ModaluploadService } from 'src/app/components/modalupload/modalupload.service';

declare var swal: any;

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: []
})
export class DoctorsComponent implements OnInit {

  constructor(private _doctorService: DoctorService, private _modalUploadService: ModaluploadService) { }

  doctors: Doctor[] = [];
  totalDoctors: number = 0;
  fromPagging: number = 0;
  sizePagging: number = 3;
  loading: boolean = false;
  isSearch: boolean = false;
  searchText: string = '';

  ngOnInit() {
    this.loadDoctors();
    this._modalUploadService.notification.subscribe(resp => {
      this.doctors = resp.collection;
      this.totalDoctors = resp.total;
      this.loading = false;
    });
  }


  loadDoctors() {
    this._doctorService.loadDoctors(this.fromPagging, this.sizePagging).subscribe( resp => {
      this.doctors = resp.collection;
      this.totalDoctors = resp.total;
    });
  }

  search( term: string ) {
    this.isSearch = false;
    if ( term.length <= 0 ) {
      this.doctors = [];
      this.totalDoctors = 0;
      this.loadDoctors();
      return;
    }
    this.isSearch = true;
    this.fromPagging = 0;
    this.loading = true;
    this._doctorService.search(term, this.fromPagging, this.sizePagging).subscribe( resp => {
      this.doctors = resp.doctors;
      this.totalDoctors = resp.total;
      this.loading = false;
    });
  }

  pagging(next: boolean) {
    if (next) {
      if ( this.fromPagging + this.sizePagging >= this.totalDoctors ) {
        return;
      }
      this.fromPagging += this.sizePagging;
      this.loadDoctors();
    } else {
      if ( this.fromPagging <= 0 ) {
        this.fromPagging = 0;
        return;
      }
      this.fromPagging -= this.sizePagging;
      // if ( this.isSearch ) {
      //   this.search(this.searchText);
      // } else {
        this.loadDoctors();
      // }
    }

  }


  removeDoctor (doctor: Doctor) {

    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this doctor!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( willDelete => {
      if (willDelete) {
        this._doctorService.deleteDoctor(doctor._id).subscribe(resp => {
           swal('Doctor removed', 'Doctor removed correctly', 'success');
           this.fromPagging = 0;
           this.loadDoctors();
        });
      }
    });
  }

  showModal(id: string) {
    this._modalUploadService.showModal( 'doctors', id);
  }


}
