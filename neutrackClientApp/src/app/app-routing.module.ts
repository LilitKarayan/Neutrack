import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './nutritionist/account/account.component';
import { CalculatorComponent } from './nutritionist/calculator/calculator.component';
import { DashboardComponent } from './nutritionist/dashboard/dashboard.component';
import { PatientsComponent } from './nutritionist/patients/patients.component';
import { AddPatientComponent } from './nutritionist/add-patient/add-patient.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'account', component: AccountComponent},
  {path: 'calculator', component: CalculatorComponent},
  {path: 'patients', component: PatientsComponent},
  {path: 'add-patient', component: AddPatientComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
