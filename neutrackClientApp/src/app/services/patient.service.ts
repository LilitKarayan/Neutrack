import { Injectable } from '@angular/core';
import * as fromApiConfig from './../../config/api.config';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import {getApiRoute } from '../../environments/environment';
import { IPatient, IDashboard, INutritionist, IProduct, IRecipe, IRecipeProduct } from '@models';
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
export class PatientService {

  constructor(private http: HttpClient) { }

  getPatient(userId): Observable<IPatient> {
    return this.http.get<IPatient>(getApiRoute(fromApiConfig.userById(userId)), httpOptions);
  }
  updatePatient(userId, user:any): Observable<IPatient> {
    return this.http.put<IPatient>(getApiRoute(fromApiConfig.userById(userId)), user, httpOptions);
  }
  getNutritionist(nutritionistId) {
    return this.http.get<INutritionist>(getApiRoute(fromApiConfig.getNutritionist(nutritionistId)), httpOptions).toPromise<INutritionist>();
  }
}


