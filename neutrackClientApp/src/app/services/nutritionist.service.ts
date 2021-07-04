import { nutritionistUpdatePatient,
  nutritionistAddPatientEndpoint,
  nutritionistGetAllPatients,
  nutritionistGetAPatient,
  nutritionistDeleteAPatient,
  getNutritionist,
  nutritionistDashboardData,
  updateNutritionist,
  searchProduct,
  updateProduct,
  createProduct,
  deleteProduct
 } from './../../config/api.config';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import {useTestApi, getApiRoute } from '../../environments/environment';
import { IPatient, IDashboard, INutritionist, IProduct } from '@models';
import * as moment from 'moment';
import CryptoJS from 'crypto-js';

const DEFAULT_PASSWORD = "neutrack-123456";
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

  hashPassword(password: string){
    var hash = CryptoJS.SHA256(password);
    return hash.toString(CryptoJS.enc.Base64);
  }

  getAllNutritionistPatient(nutritionistId): any{
    return this.http.get<any>(getApiRoute(nutritionistGetAllPatients(nutritionistId)), httpOptions).pipe();
  }
  getANutritionistPatient(nutritionistId, patientId): any{
    return this.http.get<any>(getApiRoute(nutritionistGetAPatient(nutritionistId, patientId)), httpOptions).pipe();
  }
  addPatientToNutritionist(patient: IPatient): any {
    patient.password = this.hashPassword(DEFAULT_PASSWORD);
    return this.http.post<any>(getApiRoute(nutritionistAddPatientEndpoint), patient, httpOptions).pipe();
  }
  updateNutritionistPatient(nutritionistId, patientId, patient: IPatient): any {
    return this.http.put<any>(getApiRoute(nutritionistUpdatePatient(nutritionistId, patientId)), patient, httpOptions).pipe();
  }
  deleteNutritionistPatient(nutritionistId, patientId):any{
    return this.http.delete<any>(getApiRoute(nutritionistDeleteAPatient(nutritionistId, patientId)), httpOptions).pipe();
  }

  getDashboardData(nutritionistId): Observable<IDashboard> {
    return this.http.get<IDashboard>(getApiRoute(nutritionistDashboardData(nutritionistId)), httpOptions);
  }
  getNutritionist(nutritionistId): Observable<INutritionist> {
    return this.http.get<INutritionist>(getApiRoute(getNutritionist(nutritionistId)), httpOptions);
  }

  updateNutritionist(nutritionistId, nutritionist: INutritionist){
    return this.http.put<INutritionist>(getApiRoute(updateNutritionist(nutritionistId)), nutritionist, httpOptions).toPromise();
  }

  searchProduct(productName){
    return this.http.get<IProduct[]>(getApiRoute(searchProduct(productName)), httpOptions).toPromise<IProduct[]>();
  }

  addProduct(product: IProduct){
    return this.http.post<any>(getApiRoute(createProduct), product, httpOptions ).toPromise<any>();
  }
  editProduct(product: IProduct, productId){
    return this.http.put<any>(getApiRoute(updateProduct(productId)), product, httpOptions).toPromise<any>();
  }
  deleteProduct(productId) {
    return this.http.delete<any>(getApiRoute(deleteProduct(productId)), httpOptions).toPromise<any>();
  }
}
