import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IGenerateMealPlan } from '@models';

@Component({
  selector: 'app-generate-meal-plan-modal',
  templateUrl: './generate-meal-plan-modal.component.html',
  styleUrls: ['./generate-meal-plan-modal.component.css']
})
export class GenerateMealPlanModalComponent implements OnInit {

  formInstance: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<GenerateMealPlanModalComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: IGenerateMealPlan
  ) {
    this.formInstance = this.formBuilder.group({
      patientId: ['', Validators.compose([Validators.required])],
      dailyCalories: ['', Validators.compose([Validators.required, Validators.min(100), Validators.max(2000) ])],
      numberOfDays: [0, Validators.compose([Validators.required, Validators.min(1), Validators.max(7) ])],
    });
    this.formInstance.get('patientId').setValue(data.patientId);
   }

  ngOnInit(): void {
  }

  formatLabel(value: number){
    return value + ' D';
  }
  save(): void {
    const formData = this.formInstance.getRawValue();
    const addedEntity = {...this.data, ...formData};
    this.dialogRef.close(addedEntity);
  }

}
