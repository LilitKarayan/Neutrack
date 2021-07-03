import { updateNutritionist } from './../../../config/api.config';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { INutritionist, IUser } from '@models';
import { NutritionistService } from '@services/nutritionist.service';
import { AuthenticationService } from '@services/authentication.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  private nutritionistSubject = new BehaviorSubject<INutritionist> (null);
  formInstance: FormGroup;
  minDate: Date;
  maxDate: Date;
  nutritionist$: Observable<INutritionist>;
  activeUser: IUser;
  isEdit: boolean = false;
  updatedFields: any[] = [];
  nutritionistData: IUser;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private nutritionistService: NutritionistService
  ) {
    this.authService.user.subscribe(user => this.activeUser = user);
    this.nutritionist$ = this.nutritionistSubject.asObservable();
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 120, 0, 1);
    this.maxDate = new Date(currentYear - 18, 11, 31);
  }
  get rc() {
    return (this.formInstance.controls['firstName']?.errors?.required && this.formInstance.controls['firstName']?.errors) ||
    (this.formInstance.controls['lastName']?.errors?.required && this.formInstance.controls['lastName']?.errors) ||
    (this.formInstance.controls['yearsOfExperience']?.errors?.required && this.formInstance.controls['yearsOfExperience']?.errors) ||
    (this.formInstance.controls['gender']?.errors?.required && this.formInstance.controls['gender']?.errors) ||
    (this.formInstance.controls['dateOfBirth']?.errors?.required && this.formInstance.controls['dateOfBirth']?.errors)||
    (this.formInstance.controls['phoneNumber']?.errors?.required && this.formInstance.controls['phoneNumber']?.errors)

  }

  ngOnInit(): void {
    this.getNutritionist();
    this.formInstance = this.formBuilder.group({
      id: [''],
      userId: [''],
      fullName: [''],
      email: [{ value: '', disabled:!this.isEdit}, Validators.compose([Validators.email, Validators.required])],
      firstName: [{ value: '', disabled:!this.isEdit}, Validators.compose([Validators.required])],
      lastName: [{ value: '', disabled:!this.isEdit}, Validators.compose([Validators.required])],
      gender: [{ value: '', disabled:!this.isEdit}, Validators.compose([Validators.required])],
      dateOfBirth: [{ value: '', disabled:!this.isEdit}, Validators.compose([Validators.required])],
      yearsOfExperience:[{ value: '', disabled:!this.isEdit}, Validators.compose([Validators.required, Validators.min(1), Validators.max(50)])],
      phoneNumber:[{ value: '', disabled:!this.isEdit}, Validators.compose([Validators.required])],
    });
  }

  async getNutritionist(){
    await this.nutritionistService.getNutritionist(this.activeUser.nutritionistId).subscribe(data => {
      this.nutritionistData = data;
      this.nutritionistSubject.next(data);
      this.setFormData(data);
    })
  }
  setFormData(data: INutritionist) {
    this.formInstance.get('firstName').setValue(data.firstName);
    this.formInstance.get('email').setValue(data.email);
    this.formInstance.get('lastName').setValue(data.lastName);
    this.formInstance.get('gender').setValue(data.gender);
    this.formInstance.get('dateOfBirth').setValue(data.dateOfBirth);
    this.formInstance.get('yearsOfExperience').setValue(data.yearsOfExperience);
    this.formInstance.get('phoneNumber').setValue(data.phoneNumber);
  }

  updateValue(ctrlName){
    console.log(ctrlName);
    this.updatedFields.push(ctrlName);
  }
  async save(){
    const formData = this.formInstance.getRawValue();
    const updatedData = {...this.nutritionistData, ...formData};
    let res = await this.nutritionistService.updateNutritionist(this.activeUser.nutritionistId, updatedData);
    if(res)
      this.setFormData(res);
      this.toggleEditing(false);
  }
  toggleEditing(edit: boolean){
    this.updatedFields = [];
    if(edit){
      this.isEdit = true;
      this.formInstance.get('firstName').enable();
      this.formInstance.get('lastName').enable();
      this.formInstance.get('gender').enable();
      this.formInstance.get('dateOfBirth').enable();
      this.formInstance.get('yearsOfExperience').enable();
      this.formInstance.get('phoneNumber').enable();
    } else{
      this.formInstance.setValue(this.nutritionistData);
      this.isEdit = false;
      this.formInstance.get('firstName').disable();
      this.formInstance.get('lastName').disable();
      this.formInstance.get('gender').disable();
      this.formInstance.get('dateOfBirth').disable();
      this.formInstance.get('yearsOfExperience').disable();
      this.formInstance.get('phoneNumber').disable();
    }
  }

}
