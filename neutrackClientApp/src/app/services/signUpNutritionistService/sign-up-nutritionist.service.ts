import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SignUpNutritionistService {
  public maxDate: Date;
  public genders: string[];
  public nutritionist: Object;

  constructor() {
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear - 18, 12, 31);
    this.genders = ['Male', 'Female', 'Other'];
    this.nutritionist = {};
   }

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    yearsOfExperience: new FormControl('', Validators.required)
  });

  initializeForm() {
    this.form.setValue({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      phoneNumber: '',
      gender: '',
      yearsOfExperience: ''
    })
  }

  generateNutritionist(): void {
    this.nutritionist['email'] = this.form.controls['email'].value
    this.nutritionist['password'] = this.form.controls['password'].value
    this.nutritionist['firstName'] = this.form.controls['firstName'].value
    this.nutritionist['lastName'] = this.form.controls['lastName'].value
    this.nutritionist['dateOfBirth'] = this.form.controls['dateOfBirth'].value
    this.nutritionist['phoneNumber'] = this.form.controls['phoneNumber'].value
    this.nutritionist['gender'] = this.form.controls['gender'].value
    this.nutritionist['yearsOfExperience'] = this.form.controls['yearsOfExperience'].value
  }

  getNutritionist(): object {
    return this.nutritionist;
  }
}
