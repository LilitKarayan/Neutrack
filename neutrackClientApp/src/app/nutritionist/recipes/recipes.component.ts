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
  pageSizeOptions: number[] = [5, 10, 15, 20];
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
    console.log(event);
    this.paginatedRecipe = this.recipes.slice(event.pageIndex * event.pageSize,
                                             event.pageIndex * event.pageSize + event.pageSize);
    console.log(this.paginatedRecipe);
    return event;
  }
  isRecipeDataSame(oldRecipe: IRecipe, newRecipe: IRecipe){
    return oldRecipe.name === newRecipe.name && oldRecipe.instruction === newRecipe.instruction;
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
      if (result && !this.isRecipeDataSame(item, result)) {
        delete result.recipeProducts
        let updatedRecipe = await this.nutritionistService.editRecipe(result, result.id);
        if(updatedRecipe){
          this.getAllRecipes();
          this._snackBar.openFromComponent(MessageSnackbarComponent, {
            data: `recipe: ${updatedRecipe.id} updated successfully`
          })
        }
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
        console.log(result)
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
