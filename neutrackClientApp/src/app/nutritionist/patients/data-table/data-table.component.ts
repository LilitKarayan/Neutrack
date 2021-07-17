import { searchPatients } from './../../../../config/api.config';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { PatientEditFormDialogComponent } from '../patient-edit-form-dialog/patient-edit-form-dialog.component';
import { PatientAddFormDialogComponent } from '../patient-add-form-dialog/patient-add-form-dialog.component';
import { NutritionistService } from '@services/nutritionist.service';
import { IUser, IPatient } from '@models';
import { AuthenticationService } from '@services/authentication.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MessageSnackbarComponent } from 'app/shared/message-snackbar.component';
import { NgForm } from '@angular/forms';
import { DeleteConfirmationComponent } from 'app/shared/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})


export class DataTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('searchForm') searchFrm: NgForm;
  private patientsSubject = new BehaviorSubject<IPatient[]> (null);
  public isPatientSearch = new BehaviorSubject<boolean>(false);
  activeUser: IUser;
  public displayedColumns: string[] = ['fullName', 'gender', 'age', 'email'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'actions'];
  pageSize = 10;
  pageSizeOptions: number[] = [10, 20, 30, 40, 50];
  public dataSource: MatTableDataSource<IPatient>;
  searchValue = '';
  constructor(
    public dialog: MatDialog,
    private authService: AuthenticationService,
    private nutritionistService: NutritionistService,
    private router: Router,
    private _snackBar: MatSnackBar
    ) {
    this.authService.user.subscribe(user => this.activeUser = user);
    this.dataSource = new MatTableDataSource<IPatient>();
  }

  async searchPatient(form: NgForm){
    if(form.valid){
      this.isPatientSearch.next(true);
       this.dataSource.data =  await this.nutritionistService.patientSearch(form.value['search']);
    }
  }
  clearForm(){
    this.searchValue = '';
    this.searchFrm.reset();
    this.isPatientSearch.next(false);
    this.getAllPatients();
  }

  getAge(dob: string){
    const age = moment().diff(dob, 'years',false);
    return age;
  }
  edit(data: IPatient) {
    const dialogRef = this.dialog.open(PatientEditFormDialogComponent, {
      maxHeight: "100%",
      width: "600px",
      maxWidth: "100%",
      data: data,
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.nutritionistService.updateNutritionistPatient(this.activeUser.nutritionistId, result.id, result).subscribe(() => {
          this._snackBar.openFromComponent(MessageSnackbarComponent, {
            data: `patient updated successfully`
          })
          this.getAllPatients();
        })
      }
    });
  }
  adExistingPatient(userId){
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: "Confirm you want to add this patient to your list?",
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.nutritionistService.addExistingPatientToNutritionist(userId).then(() => {
          this._snackBar.openFromComponent(MessageSnackbarComponent, {
            data: `patient added successfully`
          })
          this.getAllPatients();
        })
      }
    });
  }
  addPatient(): void {
    const dialogRef = this.dialog.open(PatientAddFormDialogComponent, {
      maxHeight: "100%",
      width: "600px",
      maxWidth: "100%",
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.nutritionistService.addPatientToNutritionist(result).subscribe(
          () => {
            this._snackBar.openFromComponent(MessageSnackbarComponent, {
              data: `patient added successfully`
            })
            this.getAllPatients();
          }
        );
      }
    });
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result && id) {
        this.nutritionistService.deleteNutritionistPatient(this.activeUser.nutritionistId, id).subscribe(() => {
          this._snackBar.openFromComponent(MessageSnackbarComponent, {
            data: `patient deleted successfully`
          })
          this.getAllPatients();
        })
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * initialize data-table by providing persons list to the dataSource.
   */
  ngOnInit(): void {
    this.getAllPatients();
  }
  getAllPatients(): void{
    this.isPatientSearch.next(false);
    this.nutritionistService.getAllNutritionistPatient(this.activeUser.nutritionistId).subscribe(data => {
      this.dataSource.data = data;
      this.patientsSubject.next(data);
      }
    );
  }
}

