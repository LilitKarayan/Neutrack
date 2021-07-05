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
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.authService.user.subscribe(user => this.activeUser = user);
    this.dataSource = new MatTableDataSource<IProduct>();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  async searchProduct(form: NgForm){
    if(form.valid){
       let result =  await this.nutritionistService.searchProduct(form.value['search']);
       if(result.length > 0){
        this.dataSource.data = result
       } else {
        this.dataSource.data = [];
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
  }

}
