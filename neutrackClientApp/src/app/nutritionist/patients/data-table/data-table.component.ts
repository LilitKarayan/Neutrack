import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { PatientFormDialogComponent } from '../patient-form-dialog/patient-form-dialog.component';
import { PatientService } from 'src/app/core/services/patient.service';
import { Patient } from 'src/app/core/models/patient';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})


export class DataTableComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public displayedColumns: string[] = ['name', 'gender', 'age', 'email'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'actions'];

  /**
   * it holds a list of active filter for each column.
   * example: {firstName: {contains: 'person 1'}}
   *
   */
  public columnsFilters = {};

  public dataSource: MatTableDataSource<Patient>;
  private serviceSubscribe: Subscription;

  constructor(private patientsService: PatientService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Patient>();
  }   

  edit(data: Patient) {
    const dialogRef = this.dialog.open(PatientFormDialogComponent, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.patientsService.edit(result);
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
    this.patientsService.getAll();
    this.serviceSubscribe = this.patientsService.patients$.subscribe(res => {
      this.dataSource.data = res;
    })
  }

  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }
}

