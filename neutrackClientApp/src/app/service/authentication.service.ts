import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import {useTestApi, getApiRoute } from '../../environments/environment';
import { IUser, IUserLogin } from '@models';
import { userLoginEndpoint, userSignUpEndpoint } from '../../config/api.config';
import {
  HttpErrorHandlerService,
  HandleError,
} from './http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: '',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private handleError: HandleError;
  private readonly _loggedInUserSource = new BehaviorSubject<IUser | null>(null);
  user$ = this._loggedInUserSource.asObservable();

  constructor(private http: HttpClient,
    httpErrorHandler: HttpErrorHandlerService) {
      this.handleError = httpErrorHandler.createHandleError('AuthenticationService');
      useTestApi();
  }

  private setLoggedInUser(user: IUser): void{
    this._loggedInUserSource.next(user);
  }
  login(loginInfo: IUserLogin): void {
    const body = JSON.stringify(loginInfo);
    const res = this.http.post(getApiRoute(userLoginEndpoint), body, httpOptions)
    .pipe(catchError(this.handleError<any>('login user')));
  }

}
