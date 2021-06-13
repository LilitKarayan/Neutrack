import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './nutritionist/account/account.component';
import { CalculatorComponent } from './nutritionist/calculator/calculator.component';
import { DashboardComponent } from './nutritionist/dashboard/dashboard.component';
import { PatientsComponent } from './nutritionist/patients/patients.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'account', component: AccountComponent},
  {path: 'calculator', component: CalculatorComponent},
  {path: 'patients', component: PatientsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
