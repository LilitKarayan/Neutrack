import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser, IPatient } from '@models';
import * as moment from 'moment';


@Component({
  selector: 'app-patient-add-form-dialog',
  templateUrl: './patient-add-form-dialog.component.html',
  styleUrls: ['./patient-add-form-dialog.component.css']
})
export class PatientAddFormDialogComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  patient: IPatient = {
    email: '',
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    phoneNumber: '',
    height: 0,
    weight: 0,
    goal: 0,
    activityLevel:0
  };

  formInstance: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<PatientAddFormDialogComponent>,
    private formBuilder: FormBuilder) {
            const currentYear = new Date().getFullYear();
      this.minDate = new Date(currentYear - 120, 0, 1);
      this.maxDate = new Date(currentYear - 18, 11, 31);
      this.formInstance = this.formBuilder.group({
        firstName: ['', Validators.compose([Validators.required])],
        lastName: ['', Validators.compose([Validators.required])],
        gender: ['', Validators.compose([Validators.required])],
        dateOfBirth: ['', Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.email, Validators.required])],
        phoneNumber:[''],
        height:['', Validators.compose([Validators.required, Validators.min(1)])],
        weight:['', Validators.compose([Validators.required, Validators.min(1)])],
        goal:['', Validators.compose([Validators.required, Validators.min(1)])],
        activityLevel:['', Validators.compose([Validators.required, Validators.min(1)])],
      });
      this.formInstance.setValue(this.patient);
    }

    get rc() {
      return (this.formInstance.controls['firstName']?.errors?.required && this.formInstance.controls['firstName']?.errors) ||
      (this.formInstance.controls['lastName']?.errors?.required && this.formInstance.controls['lastName']?.errors) ||
      (this.formInstance.controls['height']?.errors?.required && this.formInstance.controls['height']?.errors) ||
      (this.formInstance.controls['weight']?.errors?.required && this.formInstance.controls['weight']?.errors) ||
      (this.formInstance.controls['goal']?.errors?.required && this.formInstance.controls['goal']?.errors) ||
      (this.formInstance.controls['activityLevel']?.errors?.required && this.formInstance.controls['activityLevel']?.errors) ||
      (this.formInstance.controls['isActive']?.errors?.required && this.formInstance.controls['isActive']?.errors) ||
      (this.formInstance.controls['gender']?.errors?.required && this.formInstance.controls['gender']?.errors) ||
      (this.formInstance.controls['dateOfBirth']?.errors?.required && this.formInstance.controls['dateOfBirth']?.errors) ||
      (this.formInstance.controls['email']?.errors?.required  && this.formInstance.controls['email']?.errors) ||
      this.formInstance.controls['email']?.errors?.email;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  save(): void {
    const formData = this.formInstance.getRawValue();
    const addedEntity = {...this.patient, ...formData};
    this.dialogRef.close(addedEntity);
  }
}
