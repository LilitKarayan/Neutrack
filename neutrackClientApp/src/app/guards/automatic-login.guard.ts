import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@services/authentication.service';
import { IUser } from '@models';

@Injectable({
  providedIn: 'root'
})
export class AutomaticLoginGuard implements CanActivate {
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
    if(!this.isUserLoggedIn){
      return true;
    } else {
      if(this.roles && this.roles.includes('Nutritionist')){
        this.router.navigateByUrl('/dashboard');
      } else if(this.roles && this.roles.includes('User')){
        this.router.navigateByUrl('/home');
      }
      return false;
    }
  }

}
