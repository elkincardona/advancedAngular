import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { DoctorService, HospitalService } from 'src/app/services/service.index';
import { Doctor } from 'src/app/models/doctor.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModaluploadService } from 'src/app/components/modalupload/modalupload.service';


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: []
})
export class DoctorComponent implements OnInit {


  hospitals: Hospital[] = [];
  hospital: Hospital = new Hospital('');
  doctor: Doctor = new Doctor('', '', '', '');

  constructor(
    private _doctorService: DoctorService,
    private _hospitalService: HospitalService,
    private _router: Router,
    private _activatedRouter: ActivatedRoute,
    private _modalUploadService: ModaluploadService) {

    _activatedRouter.params.subscribe( params => {
      let id = params['id'];
      if (id !== 'new') {
        this.loadDoctor(id);
      }
    });


    }

  ngOnInit() {
    this._hospitalService.getHospitals(0, 1000000).subscribe( resp => {
      this.hospitals = resp.collection;
    });

    this._modalUploadService.notification.subscribe( resp => {
      this.doctor.image = resp.doctors.image;
    });
  }


  loadDoctor(id: string) {
    this._doctorService.getDoctor(id).subscribe( (resp: any) => {
      this.doctor = resp;
      this.doctor.hospital = resp.hospital._id;
      this.changeHospital(this.doctor.hospital);
    });
  }

  saveDoctor(form: NgForm) {

    if (form.invalid) {
      return;
    }

    this._doctorService.createDoctor(this.doctor).subscribe(resp => {
      if (this.doctor._id) {
        swal('Doctor updated', 'Doctor updated correctly', 'success');
      } else {
        swal('Doctor created', 'Doctor created correctly', 'success');
      }

      this.doctor._id = resp._id;
      this._router.navigate(['/doctor', this.doctor._id ]);
    });
  }

  changeHospital( id: string ) {
    this._hospitalService.getHospital(id).subscribe( resp => {
      this.hospital = resp;
    });

  }


  changePicture() {
    this._modalUploadService.showModal('doctors', this.doctor._id);
  }
}
