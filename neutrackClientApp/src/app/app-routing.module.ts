import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './nutritionist/account/account.component';
import { CalculatorComponent } from './nutritionist/calculator/calculator.component';
import { DashboardComponent } from './nutritionist/dashboard/dashboard.component';
import { PatientsComponent } from './nutritionist/patients/patients.component';
import { PatientInfoComponent } from './nutritionist/patients/patient-info/patient-info.component';
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'nutritionist/dashboard', component: DashboardComponent},
  {path: 'nutritionist/account', component: AccountComponent},
  {path: 'nutritionist/calculator', component: CalculatorComponent},
  {path: 'nutritionist/patients', component: PatientsComponent},
  {path: 'patient-info', component: PatientInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
