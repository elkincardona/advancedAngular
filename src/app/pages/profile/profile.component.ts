import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/service.index';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: User;
  imageUpload: File;
  imageTemp: string;

  constructor(private _userService: UserService) {
    this.user = this._userService.user;
   }

  ngOnInit() {
  }

  saveData(user: User) {
    this.user.name = user.name;
    if ( !this.user.google ) {
      this.user.email = user.email;
    }
    this._userService.updateUser(this.user).subscribe( resp => {
      console.log(resp);
    });
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
    // this.imageTemp = 


    this.imageUpload = file;

  }


  changeImage() {
    this._userService.updateProfileImage(this.imageUpload, this.user._id);
  }

}
