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
  deleteProduct,getProducts,
  getRecipes, getRecipeById, createRecipe, deleteRecipe, updateRecipe,
  searchPatients, getAllProductsWithPaging, getUser
 } from './../../config/api.config';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import {getApiRoute } from '../../environments/environment';
import { IPatient, IDashboard, INutritionist, IProduct, IRecipe, IRecipeProduct } from '@models';
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
  private productsSubject = new BehaviorSubject<IProduct[]>(null);
  public products$: Observable<IProduct[]>;
  constructor(private http: HttpClient,

    private router: Router) {
      this.products$ = this.productsSubject.asObservable();
     }

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

  getProducts(){
    return this.http.get<IProduct[]>(getApiRoute(getProducts), httpOptions).subscribe(res => {
      this.productsSubject.next(res);
    })
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

  getRecipes(): Observable<IRecipe[]>{
    return this.http.get<IRecipe[]>(getApiRoute(getRecipes), httpOptions);
  }

  getRecipeById(recipeId): Observable<IRecipe>{
    return this.http.get<IRecipe>(getApiRoute(getRecipeById(recipeId)), httpOptions);
  }

  createRecipe(recipe: IRecipe) {
    return this.http.post<any>(getApiRoute(createRecipe), recipe, httpOptions).toPromise<any>();
  }
  deleteRecipe(recipeId) {
    return this.http.delete<any>(getApiRoute(deleteRecipe(recipeId)), httpOptions).toPromise<any>();
  }
  editRecipe(recipe: IRecipe, recipeId){
    return this.http.put<any>(getApiRoute(updateRecipe(recipeId)), recipe, httpOptions).toPromise<any>();
  }
  patientSearch(query: string){
    const params = new HttpParams().set('q', query);
    return this.http.get<IPatient[]>(getApiRoute(searchPatients), {params}).toPromise<IPatient[]>();
  }
  getProductsWithPaging(pageNumber: string, pageSize: string){
    const params = new HttpParams()
    .set('pageNumber', pageNumber)
    .set('pageSize', pageSize);
    return this.http.get<any>(getApiRoute(getAllProductsWithPaging), {params}).toPromise<any>();
  }
  deleteAccount(userId){
    return this.http.delete(getApiRoute(getUser(userId)), httpOptions).toPromise<any>();
  }

  addExistingPatientToNutritionist(userId) {
    let url = getApiRoute(nutritionistAddPatientEndpoint);
    return this.http.post(`${url}/${userId}`, httpOptions).toPromise<any>();
  }
}
