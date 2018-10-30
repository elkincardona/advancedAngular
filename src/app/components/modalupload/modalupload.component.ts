import { Component, OnInit } from '@angular/core';
import { UploadFileService } from 'src/app/services/service.index';
import { ModaluploadService } from './modalupload.service';


@Component({
  selector: 'app-modalupload',
  templateUrl: './modalupload.component.html',
  styles: []
})
export class ModaluploadComponent implements OnInit {

  imageUpload: File;
  imageTemp: string;

  constructor(private _uploadFileService: UploadFileService, public _modalUploadService: ModaluploadService ) { }

  ngOnInit() {
  }

  imageSelection( file: File ) {

    if ( !file ) {
      this.imageUpload = null;
      return;
    }

    if (file.type.indexOf('image') < 0) {
      swal('Only images', 'the file selected isnt an image', 'error');
      this.imageUpload = null;
      this.imageTemp = null;
      return;
    }

    let reader = new FileReader();
    let urlTemp = reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imageTemp = reader.result;
    };


    this.imageUpload = file;

  }

  uploadImage() {
    this._uploadFileService.uploadFile(this.imageUpload, this._modalUploadService.type, this._modalUploadService.id)
    .then( resp => {
      this._modalUploadService.notification.emit(resp);
      this.hideModal();
    })
    .catch( err => {
      console.log('error en la carga: ' + err);
    });
  }


  hideModal() {
    this.imageTemp = null;
    this.imageUpload = null;
    this._modalUploadService.hideModal();
  }


}
