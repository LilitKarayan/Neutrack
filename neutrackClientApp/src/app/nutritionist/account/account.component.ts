import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INutritionist, IUser } from '@models';
import { NutritionistService } from '@services/nutritionist.service';
import { PatientService } from '@services/patient.service';
import { AuthenticationService } from '@services/authentication.service';
import { BehaviorSubject, Observable } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { DeleteConfirmationComponent } from 'app/shared/delete-confirmation/delete-confirmation.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MessageSnackbarComponent } from 'app/shared/message-snackbar.component';
import { ModalComponent } from 'app/shared/modal/modal.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  private userSubject = new BehaviorSubject<INutritionist> (null);
  formInstance: FormGroup;
  minDate: Date;
  maxDate: Date;
  user$: Observable<INutritionist>;
  activeUser: IUser;
  isEdit: boolean = false;
  updatedFields: any[] = [];
  userData: IUser;
  roles:any[];
  error: string;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private nutritionistService: NutritionistService,
    private patientService: PatientService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.authService.userRoles.subscribe(userRoles => this.roles = userRoles);
    this.authService.user.subscribe(user => this.activeUser = user);
    this.user$ = this.userSubject.asObservable();
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
    if(this.roles.includes('Nutritionist')){
      this.getNutritionist();
    } else if (this.roles.includes('User')){
      this.getUser();
    }

    this.formInstance = this.formBuilder.group({
      id: [''],
      userId: [''],
      fullName: [''],
      email: [{ value: '', disabled:!this.isEdit}, Validators.compose([Validators.email, Validators.required])],
      firstName: [{ value: '', disabled:!this.isEdit}, Validators.compose([Validators.required])],
      lastName: [{ value: '', disabled:!this.isEdit}, Validators.compose([Validators.required])],
      gender: [{ value: '', disabled:!this.isEdit}, Validators.compose([Validators.required])],
      dateOfBirth: [{ value: '', disabled:!this.isEdit}, Validators.compose([Validators.required])],
      yearsOfExperience: this.roles.includes('Nutritionist') ? [{ value: '', disabled:!this.isEdit}, Validators.compose([Validators.required, Validators.min(1), Validators.max(50)])] : [{ value: '', disabled:true}],
      phoneNumber:[{ value: '', disabled:!this.isEdit}, Validators.compose([Validators.required])],
      height:  this.roles.includes('User') ? [{ value: '', disabled:!this.isEdit}, Validators.compose([Validators.required, Validators.min(1)])] : [{ value: '', disabled:true}],
      weight: this.roles.includes('User') ? [{ value: '', disabled:!this.isEdit}, Validators.compose([Validators.required, Validators.min(1)])] : [{ value: '', disabled:true}],
      goal:   this.roles.includes('User') ? [{ value: '', disabled:!this.isEdit}, Validators.compose([Validators.required, Validators.min(1)])] : [{ value: '', disabled:true}],
      activityLevel: this.roles.includes('User') ? [{ value: '', disabled:!this.isEdit}, Validators.compose([Validators.required, Validators.min(1), Validators.max(4)])] : [{ value: '', disabled:true}],
      nutritionistId: [{ value: '', disabled:true}],
      initialWeight:[{ value: '', disabled:true}],
      patientActivityHistories:[{ value: '', disabled:true}],
    });
  }

  async getNutritionist(){
    await this.nutritionistService.getNutritionist(this.activeUser.nutritionistId).subscribe(data => {
      this.userData = data;
      this.userSubject.next(data);
      this.setFormData(data);
    })
  }
  setFormData(data: any) {
    this.formInstance.get('firstName').setValue(data.firstName);
    this.formInstance.get('email').setValue(data.email);
    this.formInstance.get('lastName').setValue(data.lastName);
    this.formInstance.get('gender').setValue(data.gender);
    this.formInstance.get('dateOfBirth').setValue(data.dateOfBirth);
    this.formInstance.get('phoneNumber').setValue(data.phoneNumber);
    if(this.roles.includes('Nutritionist')){
      this.formInstance.get('yearsOfExperience').setValue(data.yearsOfExperience);
    } else if (this.roles.includes('User')){
      this.formInstance.get('height').setValue(data.height);
      this.formInstance.get('weight').setValue(data.weight);
      this.formInstance.get('goal').setValue(data.goal);
      this.formInstance.get('activityLevel').setValue(data.activityLevel);
      this.formInstance.get('nutritionistId').setValue(data.nutritionistId);
      this.formInstance.get('initialWeight').setValue(data.initialWeight);
    }
  }

  async getUser(){
    await this.patientService.getPatient(this.activeUser.id).subscribe(data => {
      this.userData = data;
      this.userSubject.next(data);
      this.setFormData(data);
    })
  }
  async getPatientNutritionistDetail(nutritionistId){
    let nutritionistData = await this.patientService.getNutritionist(nutritionistId);
    if(nutritionistData){
      const dialogRef = this.dialog.open(ModalComponent, {
        maxHeight: "100%",
        width: "600px",
        maxWidth: "100%",
        hasBackdrop: true,
        data:{
          title: 'Nutritionist Detail',
          content: '',
          details: nutritionistData,
        },
      });
    } else {
      throw new Error('Nutritionist not found');
    }
  }
  async deleteAccount(){
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: "Are you sure to want delete your account?",
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.nutritionistService.deleteAccount(this.activeUser.id).then(() => {
          this.authService.logout();
        })
      }
    });
  }
  updateValue(ctrlName){
    if (!this.updatedFields.includes(ctrlName)){
      this.updatedFields.push(ctrlName);
    }
  }
  async save(){
    if(this.formInstance.valid){
      this.error = "";
      const formData = this.formInstance.getRawValue();
      const updatedData = {...this.userData, ...formData};
      let res = null;
      if(this.roles.includes('Nutritionist')){
        res = await this.nutritionistService.updateNutritionist(this.activeUser.nutritionistId, updatedData);
        if(res){
          this.showSnackBar();
          this.getNutritionist();
        }
      } else if(this.roles.includes('User')){
        this.patientService.updatePatient(this.activeUser.id, updatedData).subscribe(data => {
          res = data;
          this.showSnackBar();
          this.getUser();
        });
      }

    } else {
      this.error = "Update failed! Please correct all invalid inputs"
    }
  }
  showSnackBar(){
    this.toggleEditing(false);
    this._snackBar.openFromComponent(MessageSnackbarComponent, {
      data: `Your account was updated successfully`
    })
  }
  toggleEditing(edit: boolean){
    this.updatedFields = [];
    if(edit){
      this.isEdit = true;
      this.formInstance.get('firstName').enable();
      this.formInstance.get('lastName').enable();
      this.formInstance.get('gender').enable();
      this.formInstance.get('dateOfBirth').enable();
      this.formInstance.get('phoneNumber').enable();
      if(this.roles.includes('Nutritionist')){
        this.formInstance.get('yearsOfExperience').enable();
      } else if(this.roles.includes('User')){
        this.formInstance.get('height').enable();
        this.formInstance.get('weight').enable();
        this.formInstance.get('goal').enable();
        this.formInstance.get('activityLevel').enable();
      }

    } else{
      this.setFormData(this.userData);
      this.isEdit = false;
      this.formInstance.get('firstName').disable();
      this.formInstance.get('lastName').disable();
      this.formInstance.get('gender').disable();
      this.formInstance.get('dateOfBirth').disable();
      this.formInstance.get('phoneNumber').disable();
      if(this.roles.includes('Nutritionist')){
        this.formInstance.get('yearsOfExperience').disable();
      } else if(this.roles.includes('User')){
        this.formInstance.get('height').disable();
        this.formInstance.get('weight').disable();
        this.formInstance.get('goal').disable();
        this.formInstance.get('activityLevel').disable();
      }
    }
  }
}
