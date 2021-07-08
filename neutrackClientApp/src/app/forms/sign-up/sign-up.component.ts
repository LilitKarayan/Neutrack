import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { IUser } from '@models';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  minDate: Date;
  public maxDate: Date;
  public genders: string[];
  public nutritionist: Object;
  public form: FormGroup;
  nutritionistInfo:IUser;

  constructor(private router: Router, private authService: AuthenticationService) {
    const currentYear = new Date().getFullYear();
      this.minDate = new Date(currentYear - 120, 0, 1);
      this.maxDate = new Date(currentYear - 18, 11, 31);
  }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear - 18, 12, 31);
    this.genders = ['Male', 'Female'];
    this.nutritionist = {};
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmationPassword: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      yearsOfExperience: new FormControl('', Validators.required)
    });
  }

  getNutritionist(): object {
    return this.nutritionist;
  }

  initializeForm() {
    this.form.setValue({
      email: '',
      password: '',
      confirmationPassword: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      phoneNumber: '',
      gender: '',
      yearsOfExperience: ''
    })
  }

  defaultNutritionistObject(): void {
    this.nutritionistInfo.email = '';
    this.nutritionistInfo.password = '';
    this.nutritionistInfo.firstName = '';
    this.nutritionistInfo.lastName = '';
    this.nutritionistInfo.dateOfBirth = '';
    this.nutritionistInfo.phoneNumber = '';
    this.nutritionistInfo.gender = '';
    this.nutritionistInfo.yearsOfExperience = 0;
  }
  onSubmit(): void {
    const formData = this.form.getRawValue();
    const addedEntity = {...this.nutritionistInfo, ...formData};
    this.authService.signUpNutritionist(addedEntity)
  }

  clear() {
    this.form.reset('');
    this.initializeForm;
  }

}
