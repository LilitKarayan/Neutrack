import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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

  constructor(
    public dialogRef: MatDialogRef<PatientAddFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
