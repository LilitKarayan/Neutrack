import { PatientGuard } from './guards/patient.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './nutritionist/account/account.component';
import { CalculatorComponent } from './nutritionist/calculator/calculator.component';
import { DashboardComponent } from './nutritionist/dashboard/dashboard.component';
import { PatientsComponent } from './nutritionist/patients/patients.component';
import { SignUpComponent } from './forms/sign-up/sign-up.component';
import { LoginComponent } from './forms/login/login.component';
import { PatientInfoComponent } from './nutritionist/patients/patient-info/patient-info.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AutomaticLoginGuard } from './guards/automatic-login.guard';
import { NutritionistGuard } from './guards/nutritionist.guard';
import { DataTableComponent } from './nutritionist/patients/data-table/data-table.component';
import { ProductComponent } from './nutritionist/product/product.component';
import { RecipesComponent } from './nutritionist/recipes/recipes.component';
import {AuthorizedGuard} from './guards/authorized.guard';
import { PatientMainComponent } from './patient/patient-main/patient-main.component';

const routes: Routes = [
  {path: 'home', component: WelcomeComponent},
  {path: '', redirectTo:'home', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [NutritionistGuard]},
  {path: 'account', component: AccountComponent, canActivate: [AuthorizedGuard]},
  {path: 'calculator', component: CalculatorComponent, canActivate: [AuthorizedGuard]},
  {path: 'patients', component: PatientsComponent,
    children:[
      {path: '', component: DataTableComponent},
      {path: ':id/details', component: PatientInfoComponent},
    ],
    canActivate: [NutritionistGuard]},
  {path: 'login', component: LoginComponent, canActivate: [AutomaticLoginGuard]},
  {path: 'signup/:entity', component: SignUpComponent, canActivate: [AutomaticLoginGuard]},
  {path: 'products', component: ProductComponent, canActivate: [NutritionistGuard]},
  {path: 'history', component: PatientMainComponent, canActivate: [PatientGuard]},
  {path: 'recipes', component: RecipesComponent, canActivate: [NutritionistGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
