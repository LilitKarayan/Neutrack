import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser, IPatient } from '@models';
import * as moment from 'moment';

@Component({
  selector: 'app-patient-edit-form-dialog',
  templateUrl: './patient-edit-form-dialog.component.html',
  styleUrls: ['./patient-edit-form-dialog.component.css']
})

export class PatientEditFormDialogComponent implements OnInit {
  formInstance: FormGroup;
  minDate: Date;
  maxDate: Date;

  constructor(
    public dialogRef: MatDialogRef<PatientEditFormDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: IPatient) {
      const currentYear = new Date().getFullYear();
      this.minDate = new Date(currentYear - 120, 0, 1);
      this.maxDate = new Date(currentYear - 18, 11, 31);
      this.formInstance = this.formBuilder.group({
        userId: ['', Validators.compose([Validators.required])],
        id: ['', Validators.compose([Validators.required])],
        firstName: ['', Validators.compose([Validators.required])],
        lastName: ['', Validators.compose([Validators.required])],
        gender: ['', Validators.compose([Validators.required])],
        dateOfBirth: ['', Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.email, Validators.required])],
        height:['', Validators.compose([Validators.required])],
        weight:['', Validators.compose([Validators.required])],
        goal:['', Validators.compose([Validators.required])],
        activityLevel:['', Validators.compose([Validators.required])],
        isActive:['', Validators.compose([Validators.required])],
        fullName:[''],
        phoneNumber:[''],
        initialWeight:[''],

      });

    this.formInstance.setValue(data);
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

    ngOnInit(): void {

    }
    getDate18YearsAgo(){
      const _maxDate =  moment().subtract(18, 'years').format();
      return _maxDate;
    }

    save(): void {
      //this.dialogRef.close(Object.assign(new IPatient(), this.formInstance.value));
    }
}
