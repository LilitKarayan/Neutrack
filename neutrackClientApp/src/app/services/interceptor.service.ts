import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import { userLoginEndpoint, userSignUpEndpoint, nutritionistSignUpEndpoint } from '../../config/api.config';
import { LoadingDialogService } from './loading-dialog.service';
import { ErrorDialogService } from './error-dialog.service';
import { AuthenticationService } from './authentication.service';
import * as moment from 'moment';

const loginUrl = userLoginEndpoint;
const nutritionistSignupUrl = nutritionistSignUpEndpoint;
@Injectable({
  providedIn: 'root'
})

export class InterceptorService implements HttpInterceptor {
  private messages: string[] = [];

  constructor(private router: Router,
    private loadingDialogService: LoadingDialogService,
    private errorDialogService: ErrorDialogService,
    private authService: AuthenticationService,
    ) {
   }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingDialogService.openDialog();
    const token = localStorage.getItem("access_token");
    if(token && moment().isBefore(this.authService.getExpiration())){
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    }
    else{
      this.authService.logout();
      this.router.navigateByUrl('/login');
      this.errorDialogService.openDialog('Your session has expired. Please sign in');
    }
    return next.handle(req).do((event: HttpEvent<any>) => {
      if(event instanceof HttpResponse){
        if(event.ok){
          if(req.url.includes(loginUrl) && event.body.roles){
            event.body.roles.includes('Nutritionist')?this.router.navigateByUrl('/dashboard'):this.router.navigateByUrl('/home');
          } else if(req.url.includes(nutritionistSignupUrl)){
            this.router.navigateByUrl('/login');
          }
          this.loadingDialogService.hideDialog();
        }
      }
    }, (err: any) => {
      let errors = []
      if(err instanceof HttpErrorResponse){
        if(err.error.errors || err.error.message){
          const errorKey = err.error.errors? Object.keys(err.error.errors):[];
          const errMsg = err.error.message ? err.error.message: '';
          errorKey.forEach(key => {
            errors.push(err.error.errors[key]);
          });
          errors.push(errMsg);
        } else if(err.status === 401){
          errors.push('Sorry you do not have access to view this page.');
          this.router.navigateByUrl('/login');
        } else if ([0, 405, 422].includes(err.status))
        {
          errors.push('Unable to connect to server. Please try again later');
        } else if ([400, 403].includes(err.status))
        {
          errors.push('You have submitted invalid data');
        }
         else {
          errors.push(err.message);
        }
      }
      console.log(err);
      this.errorDialogService.openDialog(errors.join('\n'))
      this.loadingDialogService.hideDialog();
    })
  }
}
