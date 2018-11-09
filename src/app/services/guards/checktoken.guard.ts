import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ChecktokenGuard implements CanActivate {

  constructor(private _userService: UserService, private _router: Router) {

  }


  canActivate(): Promise<boolean> | boolean {

    const token = this._userService.token;
    const payload = JSON.parse( atob(token.split('.')[1]) );
    const exp = this.expire(payload.exp);
    if (exp) {
      this._router.navigate(['/login']);
      this._userService.logout();
      return false;
    }

    // else {
    //   this._userService.refreshToken().subscribe( resp => {
    //     return true;
    //   });
    // }


    return this.validateRefreshToken(payload.exp);
  }

  validateRefreshToken(expirationDate: number): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      let tokenExp = new Date( expirationDate * 1000);
      let now = new Date();
      now.setTime( now.getTime() + (1 * 60 * 60 * 1000)); // 4 hours

      // console.log(tokenExp);
      // console.log(now);
      if ( tokenExp.getTime() > now.getTime() ) {
        resolve( true );
      } else {
        this._userService.refreshToken().subscribe( resp => {
          resolve(true);
        }, (err) => {
          this._router.navigate(['/login']);
          this._userService.logout();
          reject(false);
        });
      }
    });
  }


  expire(expirationDate: number ) {
    let now = new Date().getTime() / 1000;
    if (expirationDate < now) {
      return true;
    } else {
      return false;
    }
  }
}
