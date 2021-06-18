import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import {useTestApi, getApiRoute } from '../../environments/environment';
import { IUser, IUserLogin } from '@models';
import { userLoginEndpoint, userSignUpEndpoint } from '../../config/api.config';
import {
  HttpErrorHandlerService,
  HandleError,
} from './http-error-handler.service';
import jwt_decode from 'jwt-decode';
import * as moment from 'moment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private handleError: HandleError;
  user:any;

  constructor(private http: HttpClient,
    httpErrorHandler: HttpErrorHandlerService) {
      this.handleError = httpErrorHandler.createHandleError('AuthenticationService');
      // useTestApi();
  }

  public isLoggedIn(){
    return moment().isBefore(this.getExpiration());
  }
  login(loginInfo: IUserLogin) {
     this.http.post(getApiRoute(userLoginEndpoint), loginInfo, httpOptions).subscribe(res => {
       this.setSession(res);
     }, err => {
       this.handleError(err);
     });
  }
  private setSession(authResult: any) {
    if(authResult.token){
      const decodedToken: any = jwt_decode(authResult.token);
      console.log('decoded', decodedToken);
      const expiresAt = moment().add(decodedToken.exp,'second');
      localStorage.setItem('access_token', authResult.token);
      localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }
}
  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("expires_at");
  }
  isLoggedOut() {
    return !this.isLoggedIn();
  }
  getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = expiration ? JSON.parse(expiration): null;
        return moment(expiresAt);
  }
  getLoggedUserRole(){
    if(this.isLoggedIn()){
      const token = localStorage.getItem("access_token");
      const decodedToken: any = token ? jwt_decode(token) : {};
      return decodedToken.role ? decodedToken.role : null;
    }
    return null;
  }
  getAccessToken(){
    const token = localStorage.getItem("access_token");
    return token;
  }

}
