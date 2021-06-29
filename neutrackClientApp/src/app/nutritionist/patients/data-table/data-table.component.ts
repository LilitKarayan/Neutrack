import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { PatientEditFormDialogComponent } from '../patient-edit-form-dialog/patient-edit-form-dialog.component';
import { PatientService } from '../../../core/services/patient.service';
import { Patient } from '../../../core/models/patient';
import { PatientAddFormDialogComponent } from '../patient-add-form-dialog/patient-add-form-dialog.component';
import { PatientInfoComponent } from '../patient-info/patient-info.component';
import { NutritionistService } from '@services/nutritionist.service';
import { IUser, IPatient } from '@models';
import { AuthenticationService } from '@services/authentication.service';
import * as moment from 'moment';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})


export class DataTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private patientsSubject = new BehaviorSubject<IPatient[]> (null);
  activeUser: IUser;
  public displayedColumns: string[] = ['fullName', 'gender', 'age', 'email'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'actions'];

  public dataSource: MatTableDataSource<IPatient>;

  constructor(
    private patientsService: PatientService,
    public dialog: MatDialog,
    private authService: AuthenticationService,
    private nutritionistService: NutritionistService
    ) {
    this.authService.user.subscribe(user => this.activeUser = user);
    this.dataSource = new MatTableDataSource<IPatient>();
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
        this.patientsService.edit(result);
      }
    });
  }

  view(data: IPatient) {
    const dialogRef = this.dialog.open(PatientInfoComponent, {
      width: '400%',
      height: '600px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.patientsService.edit(result);
      }
    });
  }

  addPatient(): void {
    const dialogRef = this.dialog.open(PatientAddFormDialogComponent, {
      width: '400px',
      height: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.patientsService.add(result);
      }
    });
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.patientsService.remove(id);
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
    this.nutritionistService.getAllNutritionistPatient(this.activeUser.nutritionistId).subscribe(data => {
      this.dataSource.data = data;
      this.patientsSubject.next(data);
      }
    );
  }
}

