import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Patient } from 'src/app/core/models/patient';


export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-patient-add-form-dialog',
  templateUrl: './patient-add-form-dialog.component.html',
  styleUrls: ['./patient-add-form-dialog.component.css']
})
export class PatientAddFormDialogComponent implements OnInit {
  formInstance: FormGroup;
  theEmptyPatient = new Patient(0, '', '', 0, '');
  constructor(
    public dialogRef: MatDialogRef<PatientAddFormDialogComponent>,
    private formBuilder: FormBuilder) {
      this.formInstance = this.formBuilder.group({
        id: ['', Validators.compose([Validators.required])],
        name: ['', Validators.compose([Validators.required])],
        gender: ['', Validators.compose([Validators.required])],
        age: ['', Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.email, Validators.required])],
      });
      
      this.formInstance.setValue(this.theEmptyPatient);
    }

    get rc() {
      debugger
      return (this.formInstance.controls['name']?.errors?.required && this.formInstance.controls['name']?.errors) || (this.formInstance.controls['gender']?.errors?.required && this.formInstance.controls['gender']?.errors) || (this.formInstance.controls['age']?.errors?.required && this.formInstance.controls['age']?.errors) || (this.formInstance.controls['email']?.errors?.required && this.formInstance.controls['email']?.errors) || this.formInstance.controls['email']?.errors?.email;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  save(): void {
    debugger
    this.dialogRef.close(Object.assign(new Patient(), this.formInstance.value));
  }
}
