import { Observable } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IProduct, IRecipe } from '@models';
import { NutritionistService } from '../../../services/nutritionist.service';
import { startWith } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-edit-recipe',
  templateUrl: './add-edit-recipe.component.html',
  styleUrls: ['./add-edit-recipe.component.css'],
})
export class AddEditRecipeComponent implements OnInit {
  title: string = '';
  formInstance: FormGroup;
  updatedFields: any[] = [];
  products: IProduct[];
  filteredProducts: Observable<IProduct[]>;

  constructor(
    private nutritionistService: NutritionistService,
    public dialogRef: MatDialogRef<AddEditRecipeComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      isEdit: boolean;
      recipe?: IRecipe;
    }
  ) {
    this.nutritionistService.products$.subscribe(
      (prodcts) => (this.products = prodcts)
    );
    this.title = this.data.isEdit ? 'Edit Recipe' : 'Create Recipe';
    this.formInstance = this.data.isEdit
      ? this.formBuilder.group({
          id: [''],
          name: ['', Validators.compose([Validators.required])],
          instruction: ['', Validators.compose([Validators.required])],
          recipeProducts:[]
        })
      : this.formBuilder.group({
          name: ['', Validators.compose([Validators.required])],
          instruction: ['', Validators.compose([Validators.required])],
          recipeProducts: this.formBuilder.array([]),
        });
    if (this.data.recipe) {
      this.setFormValues(this.data.recipe);
    }
  }

  ngOnInit(): void {}
  private _filterProducts(value: string): IProduct[] {
    const filterValue = value.toLocaleLowerCase();
    return this.products.filter((product) =>
      product.name.toLocaleLowerCase().includes(filterValue)
    );
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  setFormValues(recipe: IRecipe) {
    this.formInstance.get('id').setValue(recipe.id);
    this.formInstance.get('name').setValue(recipe.name);
    this.formInstance.get('instruction').setValue(recipe.instruction);
  }
  save() {
    if(this.recipeProducts.length > 0){
      this.recipeProducts.controls.forEach(fGroup => {
        let productId = this.products.find(x => x.name === fGroup.get('productName').value).id;
        fGroup.get('productId').setValue(productId);
      })
    }
    if(this.formInstance.valid){
      const formData = this.formInstance.getRawValue();
      const recipeEntity = {...this.data.recipe, ...formData};
      this.dialogRef.close(recipeEntity);
    }
  }
  get recipeProducts(): FormArray {
    return this.formInstance.get('recipeProducts') as FormArray;
  }
  newRecipeProduct(): FormGroup {
    let fg = this.formBuilder.group({
      productId: [],
      productName: ['', Validators.compose([Validators.required])],
      weightInGrams: ['', Validators.compose([Validators.required, Validators.min(0)])],
    });
    this.filteredProducts = fg.get('productName').valueChanges.pipe(
      startWith(''),
      map((product) =>  product ? this._filterProducts(product) : this.products.slice())
    );
    return fg;
  }
  addRecipeProduct() {
    this.recipeProducts.push(this.newRecipeProduct());
  }
  removeRecipeProduct(i: number) {
    this.recipeProducts.removeAt(i);
  }
}
