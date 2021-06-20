import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AutomaticLoginGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthenticationService){
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isLoggedOut()){
      return true;
    } else {
      const role: any[] = this.authService.getLoggedUserRole();
      if(role && role.includes('Nutritionist')){
        this.router.navigateByUrl('/dashboard')
      } else if(role && role.includes('User')){
        this.router.navigateByUrl('/')
      }
      return false;
    }
  }

}
