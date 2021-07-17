import { CUSTOM_ELEMENTS_SCHEMA, NgModule, ErrorHandler } from '@angular/core';
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
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CdkTableModule } from '@angular/cdk/table';
import { DataTableComponent } from './nutritionist/patients/data-table/data-table.component';
import { ConfirmationDialogComponent } from './nutritionist/patients/confirmation-dialog/confirmation-dialog.component';
import { PatientEditFormDialogComponent } from './nutritionist/patients/patient-edit-form-dialog/patient-edit-form-dialog.component';
import { PatientAddFormDialogComponent } from './nutritionist/patients/patient-add-form-dialog/patient-add-form-dialog.component';
import { PatientInfoComponent } from './nutritionist/patients/patient-info/patient-info.component';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './services/authentication.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './forms/sign-up/sign-up.component';
import { UserDataService } from './services/user-data.service';
import { LoginComponent } from './forms/login/login.component';
import { InterceptorService } from '@services/interceptor.service';
import { CalculatorFormComponent } from './forms/calculator-form/calculator-form.component';
import { LoadingDialogService } from '@services/loading-dialog.service';
import { ErrorDialogService } from '@services/error-dialog.service';
import { GlobalErrorHandlerService } from '@services/global-error-handler.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SharedModule } from './shared/shared.module';
import { NutritionistService } from '@services/nutritionist.service';
import { PatientService } from '@services/patient.service';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ChartsModule } from 'ng2-charts';
import { ProductComponent } from './nutritionist/product/product.component';
import { AddEditProductComponent } from './nutritionist/product/add-edit-product/add-edit-product.component';
import { DeleteProductComponent } from './nutritionist/product/delete-product/delete-product.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import { RecipesComponent } from './nutritionist/recipes/recipes.component';
import { DeleteRecipeComponent } from './nutritionist/recipes/delete-recipe/delete-recipe.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { AddEditRecipeComponent } from './nutritionist/recipes/add-edit-recipe/add-edit-recipe.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { PatientMainComponent } from './patient/patient-main/patient-main.component';


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
    SignUpComponent,
    LoginComponent,
    DataTableComponent,
    ConfirmationDialogComponent,
    PatientEditFormDialogComponent,
    PatientAddFormDialogComponent,
    PatientInfoComponent,
    CalculatorFormComponent,
    ProductComponent,
    AddEditProductComponent,
    DeleteProductComponent,
    RecipesComponent,
    DeleteRecipeComponent,
    AddEditRecipeComponent,
    PatientMainComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatDialogModule,
    RouterModule,
    FormsModule,
    CommonModule,
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
    HttpClientModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    SharedModule,
    ChartsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatExpansionModule
  ],
  providers: [UserDataService,
    AuthenticationService, LoadingDialogService, ErrorDialogService,
    {provide: ErrorHandler, useClass: GlobalErrorHandlerService},
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
    NutritionistService, PatientService,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    }}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
