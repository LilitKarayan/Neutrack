import { DeleteRecipeComponent } from './delete-recipe/delete-recipe.component';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { NutritionistService } from '@services/nutritionist.service';
import { IRecipe, IRecipeProduct, IProduct} from '@models';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MessageSnackbarComponent } from 'app/shared/message-snackbar.component';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { AddEditRecipeComponent } from './add-edit-recipe/add-edit-recipe.component';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, AfterViewInit {
  recipes:IRecipe[] = []
  paginatedRecipe :IRecipe[] = []
  recipes$: Observable<IRecipe[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // public columnsToDisplay: string[] = ['productName', 'weightInGrams', 'actions'];
  public columnsToDisplay: string[] = ['productName', 'weightInGrams'];

  length: number;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 20, 30, 40, 50];
  pageEvent: PageEvent;

  constructor(
    public dialog: MatDialog,
    private nutritionistService: NutritionistService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
  }
  ngAfterViewInit(): void {
    this.getProducts();
  }

  ngOnInit(): void {
    this.getAllRecipes();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  getData( event?: PageEvent) {
    this.paginatedRecipe = this.recipes.slice(event.pageIndex * event.pageSize,
                                             event.pageIndex * event.pageSize + event.pageSize);
    return event;
  }
  isRecipeDataSame(oldRecipe: IRecipe, newRecipe: IRecipe){
    return oldRecipe.name === newRecipe.name && oldRecipe.instruction === newRecipe.instruction;
  }
  isRecipeProductSame(oldRecipe: IRecipe, newRecipe: IRecipe){
    if(oldRecipe.recipeProducts.length != newRecipe.recipeProducts.length){
      return false;
    } else {
      const diff = oldRecipe.recipeProducts.filter(o => {
        !newRecipe.recipeProducts.some( n => o.productID === n.productID ||
          o.recipeID === n.recipeID ||
          o.weightInGrams === n.weightInGrams)
      });
      return diff ? false : true;
    }
  }
  editRecipe(item){
    const dialogRef = this.dialog.open(AddEditRecipeComponent, {
      maxHeight: "100%",
      width: "600px",
      maxWidth: "100%",
      data: {
        isEdit: true,
        recipe: item
      },
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result && (!this.isRecipeDataSame(item, result) || !this.isRecipeProductSame(item, result))) {
        // delete result.recipeProducts
        await this.nutritionistService.editRecipe(result, result.id);
        this._snackBar.openFromComponent(MessageSnackbarComponent, {
          data: `Recipe updated successfully`
        });
        this.getAllRecipes();
      }
    });
  }
  deleteRecipe(item: IRecipe){
    const dialogRef = this.dialog.open(DeleteRecipeComponent);
    dialogRef.afterClosed().subscribe(async result => {
      if (result && item.id) {
        await this.nutritionistService.deleteRecipe(item.id);
        this._snackBar.openFromComponent(MessageSnackbarComponent, {
          data: `Recipe deleted successfully`
        })
        this.getAllRecipes();
      }
    });
  }

  createRecipe(){
    const dialogRef = this.dialog.open(AddEditRecipeComponent, {
      maxHeight: "100%",
      width: "600px",
      maxWidth: "100%",
      data: {
        isEdit: false,
        recipe: null
      },
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        let newRecipe = await this.nutritionistService.createRecipe(result);
        if(newRecipe){
          this._snackBar.openFromComponent(MessageSnackbarComponent, {
            data: `Recipe added successfully`
          })
          this.getAllRecipes();
        }
      }
    });
  }
  async getAllRecipes(){
    this.nutritionistService.getRecipes().subscribe(data => {
      this.recipes = data;
      this.length = this.recipes.length;
      this.paginatedRecipe = this.recipes.slice(0, this.pageSize);
    });
  }
  async getProducts(){
    this.nutritionistService.getProducts();
  }

  addProductToRecipe(){

  }
  deleteRecipeProduct(item){

  }
  editRecipeProduct(item){

  }
}
