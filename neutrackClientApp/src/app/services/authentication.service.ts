import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import {useTestApi, getApiRoute } from '../../environments/environment';
import { IUser, IUserLogin } from '@models';
import { userLoginEndpoint, userSignUpEndpoint, nutritionistSignUpEndpoint } from '../../config/api.config';
import {
  HttpErrorHandlerService,
  HandleError,
} from './http-error-handler.service';
import jwt_decode from 'jwt-decode';
import * as moment from 'moment';
import CryptoJS from 'crypto-js';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<IUser>;
  private isLoggedInSubject: BehaviorSubject<boolean>;
  private isLoggedOutSubject: BehaviorSubject<boolean>;
  private rolesSubject: BehaviorSubject<string[]>;
  public user: Observable<IUser>;
  public userLoggedIn: Observable<boolean>;
  public userLoggedOut: Observable<boolean>;
  public userRoles: Observable<any[]>;

  private handleError: HandleError;

  constructor(private http: HttpClient,
    private router: Router,
    httpErrorHandler: HttpErrorHandlerService) {
      this.userSubject = new BehaviorSubject<IUser>(
        this.getActiveUser()
      );
      this.rolesSubject = new BehaviorSubject<string[]>(
        this.getLoggedUserRole()
      );
      this.isLoggedInSubject = new BehaviorSubject<boolean>(
        this.isLoggedIn()
      );
      this.isLoggedOutSubject = new BehaviorSubject<boolean>(
        this.isLoggedOut()
      );
      this.user = this.userSubject.asObservable();
      this.userRoles = this.rolesSubject.asObservable();
      this.userLoggedIn = this.isLoggedInSubject.asObservable();
      this.userLoggedOut = this.isLoggedOutSubject.asObservable();
      this.handleError = httpErrorHandler.createHandleError('AuthenticationService');
      // useTestApi();
  }

  public isLoggedIn(){
    return moment().isBefore(this.getExpiration());
  }
  public get userValue(): IUser {
    return this.userSubject.value;
  }
  getActiveUser():IUser{
    const token = localStorage.getItem("access_token");
    if(token){
      const data:any = jwt_decode(token)
      const currentUser: IUser = {
        email: data.email,
        firstName: data.given_name,
        id: data.unique_name,
        lastName: data.family_name,
        patientId: data.upn?data.upn:null,
        nutritionistId: data.actor?data.actor:null,
      }
      return currentUser;
    }
    return null;
  }
  hashPassword(password: string){
    var hash = CryptoJS.SHA256(password);
    return hash.toString(CryptoJS.enc.Base64);
  }
  login(loginInfo: IUserLogin) {
      loginInfo.password = this.hashPassword(loginInfo.password);
      this.http.post<any>(getApiRoute(userLoginEndpoint), loginInfo, httpOptions).subscribe(res => {
      let user: IUser = {
        email: res.email,
        firstName: res.firstName,
        id: res.id,
        lastName: res.lastName,
        patientId: res.patientId,
        nutritionistId: res.nutritionistId
      }
      this.rolesSubject.next(res.roles);
      this.setSession(res.token);
      this.userSubject.next(user);
      this.isLoggedInSubject.next(true);
      this.isLoggedOutSubject.next(false);
   });
  }
  signUpNutritionist(userInfo: IUser) {
    userInfo.password = this.hashPassword(userInfo.password);
     return this.http.post<IUser>(getApiRoute(nutritionistSignUpEndpoint), userInfo, httpOptions).subscribe(res => {
     })
  }

  private setSession(token: any) {
    if(token){
      const decodedToken: any = jwt_decode(token);
      const expiresAt = moment().add(decodedToken.exp,'second');
      localStorage.setItem('access_token', token);
      localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }
}
  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("expires_at");
    this.userSubject.next(null);
    this.rolesSubject.next(null);
    this.isLoggedInSubject.next(false);
    this.isLoggedOutSubject.next(true);
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
    const token = localStorage.getItem("access_token");
      const decodedToken: any = token ? jwt_decode(token) : {};
      if (decodedToken.role && Array.isArray(decodedToken.role)){
        return decodedToken.role
      }
      const roles = decodedToken.role ?  [decodedToken.role] : [];
      return roles;
  }
  getAccessToken(){
    const token = localStorage.getItem("access_token");
    return token;
  }

}
