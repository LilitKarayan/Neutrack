import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient } from 'src/app/core/models/patient';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css']
})
export class PatientInfoComponent implements OnInit {

  formInstance: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PatientInfoComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Patient) {
    this.formInstance = this.formBuilder.group({
      id: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      gender: ['', Validators.compose([Validators.required])],
      age: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.email, Validators.required])],
    });

    this.formInstance.setValue(data);
    }

    get rc() {
      return (this.formInstance.controls['name']?.errors?.required && this.formInstance.controls['name']?.errors) || (this.formInstance.controls['gender']?.errors?.required && this.formInstance.controls['gender']?.errors) || (this.formInstance.controls['age']?.errors?.required && this.formInstance.controls['age']?.errors) || (this.formInstance.controls['email']?.errors?.required  && this.formInstance.controls['email']?.errors) || this.formInstance.controls['email']?.errors?.email;
    }

    ngOnInit(): void {

    }

    save(): void {
      this.dialogRef.close(Object.assign(new Patient(), this.formInstance.value));
    }
}
