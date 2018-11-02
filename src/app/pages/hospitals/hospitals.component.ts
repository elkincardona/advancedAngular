import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/service.index';
import { ModaluploadService } from 'src/app/components/modalupload/modalupload.service';
import { Hospital } from 'src/app/models/hospital.model';
import { Title } from '@angular/platform-browser';

// so that swal doesnt generate sintax error
declare var swal: any;

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent implements OnInit {

  hospitals: Hospital[] = [];
  fromPagging: number = 0;
  sizePagging: number = 3;
  totalHospitals: number = 0;
  loading: boolean = false;
  isSearch: boolean = false;
  searchText: string = '';

  constructor(private _HospitalService: HospitalService, public _modalUploadService: ModaluploadService) { }

  ngOnInit() {
    this.loadHospitals();
    this._modalUploadService.notification.subscribe( resp => {
        this.loadHospitals();
    });
  }

  loadHospitals() {
    this.loading = true;
    this._HospitalService.getHospitals(this.fromPagging, this.sizePagging).subscribe( resp => {
      this.hospitals = resp.collection;
      this.totalHospitals = resp.total;
      this.loading = false;
    });
  }

  search( term: string ) {
    this.isSearch = false;
    if ( term.length <= 0 ) {
      this.hospitals = [];
      this.totalHospitals = 0;
      this.loadHospitals();
      return;
    }

    this.isSearch = true;
    this.fromPagging = 0;
    this.loading = true;
    this._HospitalService.search(term, this.fromPagging, this.sizePagging).subscribe( resp => {
      this.hospitals = resp.hospitals;
      this.totalHospitals = resp.total;
      this.loading = false;
    });
  }

  pagging(next: boolean) {
    if (next) {
      if ( this.fromPagging + this.sizePagging >= this.totalHospitals ) {
        return;
      }
      this.fromPagging += this.sizePagging;
      this.loadHospitals();
    } else {
      if ( this.fromPagging <= 0 ) {
        this.fromPagging = 0;
        return;
      }
      this.fromPagging -= this.sizePagging;
      // if ( this.isSearch ) {
      //   this.search(this.searchText);
      // } else {
        this.loadHospitals();
      // }
    }

  }


  removeHospital (hospital: Hospital) {

    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this hospital!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( willDelete => {
      if (willDelete) {
        this._HospitalService.deleteHospital(hospital._id).subscribe(resp => {
           swal('Hospital removed', 'Hospital removed correctly', 'success');
           this.fromPagging = 0;
           this.loadHospitals();
        });
      }
    });
  }



  updateHospital (hospital: Hospital) {
    swal({
      title: 'Are you sure?',
      text: 'you will update the name for this hospital!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( willUpdate => {
      if (willUpdate) {
        this._HospitalService.updateHospital(hospital).subscribe(resp => {
           swal('Hospital updated', 'Hospital name updated correctly', 'success');
           this.fromPagging = 0;
           this.loadHospitals();
        });
      }
    });
  }

  showModal(id: string) {
    this._modalUploadService.showModal( 'hospitals', id);
  }

  createHospital() {
    swal({
      title: 'Create Hospital',
      text: 'Please enter the hospital name',
      content: 'input',
      icon: 'info',
      buttons: true,
      danderMode: true
    })
    .then((value) => {
      if (!value || value.length === 0) {
        return;
      }

      this._HospitalService.createHospital(value).subscribe( resp => {
        swal('Hospital created', 'Hospital created correctly', 'success');
        this.loadHospitals();
      });
    });
  }

}
