import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private _userService: UserService, private _router: Router) {
  }

  canActivate() {
    if ( this._userService.user.role === 'admin_role') {
      return true;
    } else {
      this._router.navigate(['/dashboard']);
      return false;
    }

  }

}
