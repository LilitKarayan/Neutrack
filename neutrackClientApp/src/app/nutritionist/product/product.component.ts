import { DeleteProductComponent } from './delete-product/delete-product.component';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '@services/authentication.service';
import { Router } from '@angular/router';
import { NutritionistService } from '@services/nutritionist.service';
import { IUser, IProduct } from '@models';
import { NgForm } from '@angular/forms';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MessageSnackbarComponent } from 'app/shared/message-snackbar.component';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject } from 'rxjs';

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
  length: number;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 20, 30, 40, 50];
  pageEvent: PageEvent;
  searchProductsResult:IProduct[];
  productData: any;
  pageProducts:IProduct[];
  public isProductsSearch = new BehaviorSubject<boolean>(false);
  public dataSource: MatTableDataSource<IProduct>;
  public displayedColumns: string[] = ['name', 'caloriesPerGram', 'proteinInGrams', 'fatInGrams', 'carbInGrams'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'actions'];
  searchValue = '';
  constructor(
    private nutritionistService: NutritionistService,
    public dialog: MatDialog,
    private authService: AuthenticationService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.authService.user.subscribe(user => this.activeUser = user);
  }
  ngAfterViewInit(): void {
  }
  clearForm(){
    this.searchValue = '';
    this.searchFrm.reset();
    this.isProductsSearch.next(false);
    this.getProducts();
  }
  async getProducts(pageNumber?, pageSize?){
    this.isProductsSearch.next(false);
    if(pageNumber && pageSize){
      this.productData = await this.nutritionistService.getProductsWithPaging(pageNumber, pageSize);
      this.pageProducts = this.productData.items;
      this.length = this.productData.total;
    }else{
      this.productData = await this.nutritionistService.getProductsWithPaging('1', `${this.pageSize}`);
      this.pageProducts = this.productData.items;
      this.length = this.productData.total;
    }
  }
  async searchProduct(form: NgForm){
    if(form.valid){
      this.isProductsSearch.next(true);
       this.searchProductsResult =  await this.nutritionistService.searchProduct(form.value['search']);
       if(this.searchProductsResult.length > 0){
        this.length = this.searchProductsResult.length;
        this.pageProducts = this.searchProductsResult.slice( 0, this.pageSize);
       }
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
          this._snackBar.openFromComponent(MessageSnackbarComponent, {
            data: `product added successfully`
          })
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
          this._snackBar.openFromComponent(MessageSnackbarComponent, {
            data: `product: ${updatedProduct.name} updated successfully`
          })
        }
      }
    });
  }
  delete(id: any){
    const dialogRef = this.dialog.open(DeleteProductComponent);
    dialogRef.afterClosed().subscribe(async result => {
      if (result && id) {
        await this.nutritionistService.deleteProduct(id);
        this.searchFrm.resetForm();
        this.dataSource.data = [];
        this._snackBar.openFromComponent(MessageSnackbarComponent, {
          data: `product: ${id} deleted successfully`
        })
      }
    });
  }
  ngOnInit(): void {
    this.getProducts();
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  getProductData(event?: PageEvent){
    if(this.isProductsSearch.value){
      this.pageProducts = this.searchProductsResult.slice(event.pageIndex * event.pageSize,
        event.pageIndex * event.pageSize + event.pageSize);
        return event;
    } else {
      this.getProducts(`${event.pageIndex + 1}`, `${event.pageSize}`);
      return event;
    }
  }

}
