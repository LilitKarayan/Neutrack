import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@services/authentication.service';
import { IUser } from '@models';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate {
  isUserLoggedIn: boolean;
  activeUser: IUser;
  roles:string[];
  constructor(private router: Router, private authService: AuthenticationService){
    this.authService.user.subscribe(user => this.activeUser = user);
    this.authService.userLoggedIn.subscribe(userLoggedIn => this.isUserLoggedIn = userLoggedIn);
    this.authService.userRoles.subscribe(userRoles => this.roles = userRoles);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.roles && (this.roles.includes('User') || this.roles.includes('Nutritionist') )){
        return true;
      } else {
        this.router.navigate(['/home']);
        return false;
      }
  }

}
