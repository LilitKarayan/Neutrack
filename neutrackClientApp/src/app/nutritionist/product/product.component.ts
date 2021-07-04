import { DeleteProductComponent } from './delete-product/delete-product.component';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '@services/authentication.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { NutritionistService } from '@services/nutritionist.service';
import { IUser, IProduct } from '@models';
import { NgForm } from '@angular/forms';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('searchForm') searchFrm: NgForm;
  activeUser: IUser;
  public dataSource: MatTableDataSource<IProduct>;

  public displayedColumns: string[] = ['name', 'caloriesPerGram', 'proteinInGrams', 'fatInGrams', 'carbInGrams'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'actions'];
  searchValue = '';
  constructor(
    private nutritionistService: NutritionistService,
    public dialog: MatDialog,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.authService.user.subscribe(user => this.activeUser = user);
    this.dataSource = new MatTableDataSource<IProduct>();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  async searchProduct(form: NgForm){
    if(form.valid){
      this.dataSource.data =  await this.nutritionistService.searchProduct(form.value['search']);
    }
  }
  addProducts(){
    const dialogRef = this.dialog.open(AddEditProductComponent, {
      maxHeight: "100%",
      width: "600px",
      maxWidth: "100%",
      data: {
        isEdit: false,
        product: null
      },
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        let newProduct = await this.nutritionistService.addProduct(result);
        if(newProduct){
          this.searchFrm.resetForm();
        }
      }
    });
  }
  editProduct(data: IProduct){
    const dialogRef = this.dialog.open(AddEditProductComponent, {
      maxHeight: "100%",
      width: "600px",
      maxWidth: "100%",
      data: {
        isEdit: true,
        product: data
      },
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        let updatedProduct = await this.nutritionistService.editProduct(result, data.id);
        if(updatedProduct){
          this.searchProduct(this.searchFrm);
        }
      }
    });
  }
  delete(id: any){
    const dialogRef = this.dialog.open(DeleteProductComponent);
    dialogRef.afterClosed().subscribe(async result => {
      if (result && id) {
        let result = await this.nutritionistService.deleteProduct(id);
        if(result){
          this.dataSource.data = null;
        }
      }
    });
  }
  ngOnInit(): void {
  }

}
