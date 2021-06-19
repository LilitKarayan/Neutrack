import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FormsComponent } from './forms/forms.component';
import { NutritionistComponent } from './nutritionist/nutritionist.component';
import { DashboardComponent } from './nutritionist/dashboard/dashboard.component';
import { PatientsComponent } from './nutritionist/patients/patients.component';
import { CalculatorComponent } from './nutritionist/calculator/calculator.component';
import { AccountComponent } from './nutritionist/account/account.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { AddPatientComponent } from './nutritionist/add-patient/add-patient.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './nutritionist/patients/dialog/dialog.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CdkTableModule } from '@angular/cdk/table';
import { DataTableComponent } from './nutritionist/patients/data-table/data-table.component';
import { ConfirmationDialogComponent } from './nutritionist/patients/confirmation-dialog/confirmation-dialog.component';
import { PatientEditFormDialogComponent } from './nutritionist/patients/patient-edit-form-dialog/patient-edit-form-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    FormsComponent,
    NutritionistComponent,
    DashboardComponent,
    PatientsComponent,
    CalculatorComponent,
    AccountComponent,
    SideNavComponent,
    ToolbarComponent,
    WelcomeComponent,
    AddPatientComponent,
    DialogComponent,
    DataTableComponent,
    ConfirmationDialogComponent,
    PatientEditFormDialogComponent,
    
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule,
    FormsModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,

    CdkTableModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
