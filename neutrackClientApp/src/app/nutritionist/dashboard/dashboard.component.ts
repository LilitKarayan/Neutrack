import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { NutritionistService } from '@services/nutritionist.service';
import { IUser, IPatient } from '@models';
import { AuthenticationService } from '@services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  private patientsSubject = new BehaviorSubject<IPatient[]> (null);
  activeUser: IUser;
  patients: Observable<IPatient[]>;
  columnsToDisplay =
  ['fullName','dateOfBirth','gender','email' ];

  expandedElement: IPatient | null;

  constructor(private authService: AuthenticationService,private nutritionistService: NutritionistService){
    this.authService.user.subscribe(user => this.activeUser = user);
    this.patients = this.patientsSubject.asObservable();
  }
  ngOnInit(): void {
    this.getAllPatients();
  }

  getAllPatients(): void{
    this.nutritionistService.getAllNutritionistPatient(this.activeUser.nutritionistId).subscribe(data => {
      this.patientsSubject.next(data);
      }
    );
  }
}
