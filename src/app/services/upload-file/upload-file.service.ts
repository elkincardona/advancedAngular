import { Injectable } from '@angular/core';
import { servicesUrl } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() { }

  uploadFile(file: File, typeImg: string, id: string) {

    return new Promise( (resolve, reject) => {
      let formData = new FormData();
      formData.append('image', file, file.name);
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
          if ( xhr.readyState == 4) {
            if (xhr.status == 200) {
              console.log('image uploaded');
              resolve( JSON.parse(xhr.response) );
            } else {
              console.log('upload image fail');
              reject( xhr.response );
            }
          }
       };
       let url = servicesUrl + '/upload/' + typeImg + '/' + id;
       xhr.open('PUT', url, true) ;
       xhr.send(formData);

    });

  }


}
