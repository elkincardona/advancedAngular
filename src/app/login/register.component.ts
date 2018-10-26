import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare function init_puglins();
import swal from 'sweetalert';
import { UserService } from '../services/service.index';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  formControl: FormGroup;


  constructor(public _userService: UserService,
    private _router: Router) { }

  ngOnInit() {
    init_puglins();

    this.formControl = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      password2: new FormControl(null, [Validators.required]),
      terms: new FormControl(false)
    }, {validators: this.validateEqualValues('password', 'password2')});

    this.formControl.setValue({
      name: 'Elkin',
      email: 'elkinprogramado@hotmail.com',
      password: '123456',
      password2: '123456',
      terms: true
    });

  }

  registerUser() {
    if (this.formControl.invalid) {
      return;
    }

    if (!this.formControl.value.terms ) {
      swal("Important", "Must be accept terms", "warning");
      // console.log('Debe aceptar las condiciones');
      return;
    }

    const user = new User(
      this.formControl.value.name,
      this.formControl.value.email,
      this.formControl.value.password
      );
    this._userService.createUser(user).subscribe( resp => {
       // console.log(resp);
       this._router.navigate(['/login']);
    }, err => {
       swal("Important", err.error.errors.message, "error");
       // console.log(err);
    });

  }

  validateEqualValues(ev1: string, ev2: string ) {
    return ( group: FormGroup ) => {

      const pass = group.controls[ev1].value;
      const pass2 = group.controls[ev2].value;

      if (pass === pass2) {
        return null;
      }

      return {
        areNotEquals: true
      };
    };
  }

}
