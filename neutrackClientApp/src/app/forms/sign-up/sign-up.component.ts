import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { IUser } from '@models';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MessageSnackbarComponent } from 'app/shared/message-snackbar.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  minDate: Date;
  entity: string;
  public maxDate: Date;
  public genders: string[];
  public nutritionist: Object;
  public form: FormGroup;
  nutritionistInfo:IUser;
  patient: IUser;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute) {
      const currentYear = new Date().getFullYear();
      this.minDate = new Date(currentYear - 120, 0, 1);
      this.maxDate = new Date(currentYear - 18, 11, 31);
      this.activatedRoute.paramMap.subscribe(params => {
        this.entity = params.get('entity');
      })
  }

  ngOnInit(): void {
    this.genders = ['Male', 'Female'];
    this.nutritionist = {};
    this.form =  new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmationPassword: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      yearsOfExperience: this.entity === 'nutritionist' ? new FormControl('', Validators.required) : new FormControl(''),
      height:  this.entity === 'patient' ? new FormControl('', Validators.compose([Validators.required, Validators.min(1)])) : new FormControl(''),
      weight: this.entity === 'patient' ? new FormControl('', Validators.compose([Validators.required, Validators.min(1)])) : new FormControl(''),
      goal:   this.entity === 'patient' ? new FormControl('', Validators.compose([Validators.required, Validators.min(1)])) : new FormControl(''),
      activityLevel: this.entity === 'patient' ? new FormControl('', Validators.compose([Validators.required, Validators.min(1), Validators.max(4)])) : new FormControl(''),
    })
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
      yearsOfExperience: '',
      height: '',
      weight: '',
      goal: '',
      activityLevel: '',
    });
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

  defaultPatientObject(): void {
    this.patient.email = '';
    this.patient.password = '';
    this.patient.firstName = '';
    this.patient.lastName = '';
    this.patient.dateOfBirth = '';
    this.patient.phoneNumber = '';
    this.patient.gender = '';
    this.patient.height = 0;
    this.patient.weight = 0;
    this.patient.goal = 0;
    this.patient.activityLevel = 0;
  }
  onSubmit(): void {
    const formData = this.form.getRawValue();
    switch(this.entity){
      case 'nutritionist':
        const nutritionistEntity = {...this.nutritionistInfo, ...formData};
        this.authService.signUpNutritionist(nutritionistEntity).subscribe(() => {
          this._snackBar.openFromComponent(MessageSnackbarComponent, {
            data: `Your nutritionist account was successful created. Login with password & email`
          })
        })
        break;
      case 'patient':
        const patientEntity = {...this.patient, ...formData};
        this.authService.signUpPatient(patientEntity).subscribe(() => {
          this._snackBar.openFromComponent(MessageSnackbarComponent, {
            data: `Your patient account was successful created. Login with password & email`
          })
        })
        break;
      default:
        const addeEntity = {...formData};
        this.authService.signUpPatient(addeEntity).subscribe(() => {
          this._snackBar.openFromComponent(MessageSnackbarComponent, {
            data: `Your account was successful created. Login with password & email`
          })
        })
        break;
    }
  }

  clear() {
    this.form.reset();
    // this.initializeForm;
  }

}
