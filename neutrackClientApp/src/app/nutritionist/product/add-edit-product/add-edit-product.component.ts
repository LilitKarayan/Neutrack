import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IProduct } from '@models';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {
  title:string= ''
  formInstance: FormGroup;
  updatedFields: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<AddEditProductComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {
      isEdit: boolean,
      product?: IProduct
    }
  ) {
    this.title =  this.data.isEdit ? "Edit Product" : "Add new product"
    this.formInstance = this.data.isEdit ?  this.formBuilder.group({
      id: [''],
      name: ['', Validators.compose([Validators.required])],
      caloriesPerGram: ['', Validators.compose([Validators.required])],
      proteinInGrams: [''],
      fatInGrams: [''],
      carbInGrams:[''],
      recipeProducts:[[]]
    }):this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      caloriesPerGram: ['', Validators.compose([Validators.required])],
      proteinInGrams: [''],
      fatInGrams: [''],
      carbInGrams:[''],
    });

    if(this.data.product){
      this.formInstance.setValue(this.data.product);
    }
  }

  get rc() {
    return (this.formInstance.controls['name']?.errors?.required && this.formInstance.controls['name']?.errors) ||
    (this.formInstance.controls['caloriesPerGram']?.errors?.required && this.formInstance.controls['caloriesPerGram']?.errors);
  }
  ngOnInit(): void {
  }

  updateValue(ctrlName){
    if (!this.updatedFields.includes(ctrlName)){
      this.updatedFields.push(ctrlName);
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    const formData = this.formInstance.getRawValue();
    const productEntity = {...this.data.product, ...formData};
    this.dialogRef.close(productEntity);
  }

}
