import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SignUpNutritionistService {
  public maxDate: Date;
  public genders: string[];

  constructor() {
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear - 18, 12, 31);
    this.genders = ['Male', 'Female', "Other"];
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
}
