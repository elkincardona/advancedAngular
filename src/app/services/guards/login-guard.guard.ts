import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user/user.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(private _userService: UserService, private _router: Router) {

  }

  canActivate() {

    if (this._userService.isLogged()) {
      // console.log('guard passed');
      return true;
    } else {
      console.log('blocked by guard');
      this._router.navigate(['/login']);
      return false;
    }

    console.log('pass login guard');
    return true;
  }
}
