import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './nutritionist/account/account.component';
import { CalculatorComponent } from './nutritionist/calculator/calculator.component';
import { DashboardComponent } from './nutritionist/dashboard/dashboard.component';
import { PatientsComponent } from './nutritionist/patients/patients.component';
import { PatientInfoComponent } from './nutritionist/patients/patient-info/patient-info.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AutomaticLoginGuard } from './guards/automatic-login.guard';
import { NutritionistGuard } from './guards/nutritionist.guard';

const routes: Routes = [
  {path: 'home', component: WelcomeComponent, canActivate: [AutomaticLoginGuard]},
  {path: '', redirectTo:'home', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [NutritionistGuard]},
  {path: 'account', component: AccountComponent, canActivate: [NutritionistGuard]},
  {path: 'calculator', component: CalculatorComponent, canActivate: [NutritionistGuard]},
  {path: 'patients', component: PatientsComponent, canActivate: [NutritionistGuard]},
  {path: 'patient-info', component: PatientInfoComponent, canActivate: [NutritionistGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
