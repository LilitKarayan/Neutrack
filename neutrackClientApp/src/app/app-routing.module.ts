import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './nutritionist/account/account.component';
import { CalculatorComponent } from './nutritionist/calculator/calculator.component';
import { DashboardComponent } from './nutritionist/dashboard/dashboard.component';
import { PatientsComponent } from './nutritionist/patients/patients.component';
import { PatientInfoComponent } from './nutritionist/patients/patient-info/patient-info.component';


const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'account', component: AccountComponent},
  {path: 'calculator', component: CalculatorComponent},
  {path: 'patients', component: PatientsComponent},
  {path: 'patient-info', component: PatientInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
