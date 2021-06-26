import { nutritionistUpdatePatient,
  nutritionistAddPatientEndpoint,
  nutritionistGetAllPatients,
  nutritionistGetAPatient,
  nutritionistDeleteAPatient,
  getNutritionist
 } from './../../config/api.config';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import {useTestApi, getApiRoute } from '../../environments/environment';
import { IPatient } from '@models';
import * as moment from 'moment';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class NutritionistService {

  constructor(private http: HttpClient, private router: Router) { }

  getAllNutritionistPatient(nutritionistId): any{
    console.log(getApiRoute(nutritionistGetAllPatients(nutritionistId)));
    return this.http.get<any>(getApiRoute(nutritionistGetAllPatients(nutritionistId))).pipe();
  }
}
