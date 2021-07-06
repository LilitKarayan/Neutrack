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

  public columnsToDisplay: string[] = ['productName', 'weightInGrams', 'actions'];

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
  editRecipe(item){
    console.log(item);
  }
  deleteRecipe(item){
    console.log(item);
  }

  async createRecipe(){

  }
  async getAllRecipes(){
    this.nutritionistService.getRecipes().subscribe(data => {
      this.recipes = data;
      this.length = this.recipes.length;
      this.paginatedRecipe = this.recipes.slice(0, this.pageSize);
    });
  }

  addProductToRecipe(){

  }
  deleteRecipeProduct(item){

  }
  editRecipeProduct(item){

  }
}
