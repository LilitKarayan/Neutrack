import { PatientService } from '@services/patient.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as fromModel from '@models';
import {Message,MessageService} from 'primeng/api';

@Component({
  selector: 'app-meal-plan-list',
  templateUrl: './meal-plan-list.component.html',
  styleUrls: ['./meal-plan-list.component.css'],
  providers: [MessageService]
})
export class MealPlanListComponent implements OnInit {
  activeUser: fromModel.IUser;
  mealPlans: fromModel.IMealPlan[];
  noMealPlanMsg: Message[];

  rowGroupMetadata: any;

  constructor(
    private _patientService: PatientService,
    private _authService: AuthenticationService,
    private _router: Router,
    private messageService: MessageService,
  ) {
    this._authService.user.subscribe(user => this.activeUser = user);
  }

  async getMealPlans(){
    this.mealPlans = await this._patientService.getPatientsMealPlan(this.activeUser.patientId);
    this.updateRowGroupMetaData();
  }

  ngOnInit(): void {
    this.getMealPlans();
    this.noMealPlanMsg = [
      {severity:'info', summary:'No meal plan', detail:'Your nutritionist has not created a meal plan for you'},
    ];
  }
  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    if (this.mealPlans) {
        for (let i = 0; i < this.mealPlans.length; i++) {
            let rowData = this.mealPlans[i];
            let representativeName = rowData.day;
            if (i == 0) {
                this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
            }
            else {
                let previousRowData = this.mealPlans[i - 1];
                let previousRowGroup = previousRowData.day;
                if (representativeName === previousRowGroup)
                    this.rowGroupMetadata[representativeName].size++;
                else
                    this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
            }
        }
    }
  }
  onSort() {
    this.updateRowGroupMetaData();
  }
}
