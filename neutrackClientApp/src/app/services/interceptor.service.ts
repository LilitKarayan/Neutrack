import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import {useTestApi, getApiRoute } from '../../environments/environment';
import { userLoginEndpoint, userSignUpEndpoint, nutritionistSignUpEndpoint } from '../../config/api.config';


const loginUrl = getApiRoute(userLoginEndpoint);
const signupUrl = getApiRoute(userSignUpEndpoint);
@Injectable({
  providedIn: 'root'
})

export class InterceptorService implements HttpInterceptor {
  private errorsSubject: BehaviorSubject<string>;
  public error: Observable<string>;
  public messageSubject: BehaviorSubject<string>;
  public message: Observable<string>;

  constructor(private router: Router) {
    this.errorsSubject = new BehaviorSubject<string>('');
    this.error = this.errorsSubject.asObservable();
    this.messageSubject = new BehaviorSubject<string>('');
    this.message = this.errorsSubject.asObservable();
   }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("access_token");
    if(token){
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    }
    return next.handle(req).do((event: HttpEvent<any>) => {
      console.log(req.url);
      if(event instanceof HttpResponse){
        if(event.ok){
          if(req.url === loginUrl && event.body['roles'].includes('Nutritionist')){
            this.router.navigateByUrl('/dashboard');
          }else if(req.url === loginUrl){
            this.router.navigateByUrl('/home');
          } else if(req.url === signupUrl){
            this.router.navigateByUrl('/login');
          }
        }
      }
    }, (err: any) => {
      if(err instanceof HttpErrorResponse){
        let errors = []
        if(err.error.errors){
          const errorKey = Object.keys(err.error.errors);
          errorKey.forEach(key => {
            errors.push(err.error.errors[key]);
          });
        }
        if(err.status === 401){
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
        window.alert(errors.join('\n'));
      }
    })
  }
}
// if(res.roles.includes('Nutritionist')){

// }else {
//   this.router.navigateByUrl('/home');
// }
