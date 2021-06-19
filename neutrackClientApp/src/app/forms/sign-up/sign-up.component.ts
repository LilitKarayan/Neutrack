import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { SignUpNutritionistService } from 'src/app/services/signUpNutritionistService/sign-up-nutritionist.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  public maxDate: Date;
  public genders: string[];
  public nutritionist: Object;
  public form: FormGroup;
  // public heightFeet: number;
  // public heightInches: number;
  // public genders: string[];

  // public theRoles: string[];
  // public userDynamicInfo: string;

  // public initialObject: object;

  constructor() {

  }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear - 18, 12, 31);
    this.genders = ['Male', 'Female', 'Other'];
    this.nutritionist = {};
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
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

  clear() {
    this.form.reset('');
    this.initializeForm;
  }

  signUp() {
    this.generateNutritionist();
    console.log(this.getNutritionist());
  }
  // ngOnInit(): void {
  //   this.initialObject = {};
  //   this.initializeValues();
  // }

  // initializeValues(): void  {
  //   this.genders = ['Male', 'Female'];
  //   this.heightFeet = null;
  //   this.heightInches = null;

  //   this.theRoles = [
  //     'Nutritionist', 'Patient'
  //   ];

  //   this.initialObject['selectedRole'] = '';
  //   this.initialObject['email'] = '';
  //   this.initialObject['password'] = '';
  //   this.initialObject['firstName'] = '';
  //   this.initialObject['lastName'] = '';
  //   this.initialObject['dateOfBirth'] = '';
  //   this.initialObject['phoneNumber'] = '';
  //   this.initialObject['selectedGender'] = '';
  //   this.initialObject['height'] = null;
  //   this.initialObject['weight'] = null;
  //   this.initialObject['yearsOfExperience'] = null;
  //   this.initialObject['activityLevel'] = null;
  //   this.initialObject['goal'] = '';
  // }

  // signUp(): void  {
  //   this.initialObject['height'] = parseFloat(this.heightFeet + '.' + this.heightInches);

  //   for(let [key, value] of Object.entries(this.initialObject)) {
  //     this.userDataService.addSignUpInfo(key, value);
  //   }

  //   console.log(this.userDataService.getSignUpInfo());
  // }

  // radioChangeHandlerRole(event: any): void  {
  //   this.initialObject['selectedRole'] = event.target.value;

  //   if(this.initialObject['selectedRole'] === 'nutritionist') {
  //     this.userDynamicInfo = 'Years of Experience';
  //   } else {
  //     this.userDynamicInfo = 'Activity Level';
  //   }
  // }

  // radioChangeHandlerGender(event: any): void  {
  //   this.initialObject['selectedGender'] = event.target.value;
  // }
}
