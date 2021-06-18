import { Component, OnInit } from '@angular/core';
import { SignUpNutritionistService } from 'src/app/services/signUpNutritionistService/sign-up-nutritionist.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  // public heightFeet: number;
  // public heightInches: number;
  // public genders: string[];

  // public theRoles: string[];
  // public userDynamicInfo: string;

  // public initialObject: object;

  constructor(public signUpService: SignUpNutritionistService) {}

  ngOnInit(): void {
    
  }

  clear() {
    this.signUpService.form.reset('');
    //this.signUpService.initializeForm;
  }

  
  signUp() {
    this.signUpService.generateNutritionist();
    console.log(this.signUpService.getNutritionist());
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
