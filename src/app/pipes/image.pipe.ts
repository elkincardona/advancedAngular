import { Pipe, PipeTransform } from '@angular/core';
import { servicesUrl } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(image: string, typeImg: string = 'user'): any {

    let url = servicesUrl + '/img';
    if ( !image ) {
      return url + '/users/noimage';
    }

    if ( image.indexOf('https') >= 0) {
      return image;
    }

    switch ( typeImg ) {
      case 'user':

         url += '/users/' + image;

      break;

      case 'doctor':

        url += '/doctors/' + image;

      break;

      case 'hospital':
        url += '/hospitals/' + image;

      break;

      default:
        console.log('image type doesnt exists');
        url += '/users/noimage';

    }

    return url;

  }

}
