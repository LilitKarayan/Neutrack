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
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';

import { MatFormFieldModule } from '@angular/material/form-field';

// import { AddPatientComponent } from './nutritionist/add-patient/add-patient.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorHandlerService } from './services/http-error-handler.service';
import { AuthenticationService } from './services/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from './services/message.service';

import { SignUpComponent } from './forms/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDataService } from './services/user-data.service';
import { LoginComponent } from './forms/login/login.component';
import { LoginService } from './services/loginService/login.service';
import { SignUpNutritionistService } from './services/signUpNutritionistService/sign-up-nutritionist.service';


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
    LoginComponent
    // AddPatientComponent,
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
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    RouterModule,
    CommonModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserDataService,
    LoginService,
    SignUpNutritionistService, AuthenticationService, HttpErrorHandlerService, MessageService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
