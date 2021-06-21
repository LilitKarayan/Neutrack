import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';


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
      if(event instanceof HttpResponse){
        if(event.ok){
          this.messageSubject.next('Your request was successfully processed');
        }
      }
    }, (err: any) => {
      if(err instanceof HttpErrorResponse){
        if(err.status === 401){
          this.router.navigateByUrl('/login');
        } else {
          this.errorsSubject.next(err.message);
        }
      }
    })
  }
}
