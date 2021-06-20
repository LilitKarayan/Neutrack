import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@services/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class NutritionistGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthenticationService){
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const roles: any[] = this.authService.getLoggedUserRole();
    if(roles && roles.includes('Nutritionist')){
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
  }

}
