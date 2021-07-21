import { PatientService } from '@services/patient.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import {DialogService} from 'primeng/dynamicdialog';
import * as fromModel from '@models';
import {Message,MessageService} from 'primeng/api';
import { NutritionistService } from '@services/nutritionist.service';
import * as FileSaver from 'file-saver'
import { RecipleModalDialogComponent } from '../reciple-modal-dialog/reciple-modal-dialog.component';

@Component({
  selector: 'app-meal-plan-list',
  templateUrl: './meal-plan-list.component.html',
  styleUrls: ['./meal-plan-list.component.css'],
  providers: [MessageService, DialogService]
})
export class MealPlanListComponent implements OnInit {
  activeUser: fromModel.IUser;
  mealPlans: fromModel.IMealPlan[];
  noMealPlanMsg: Message[];
  cols: any[];
  exportColumns: any[];
  rowGroupMetadata: any;
  recipeDetail: fromModel.IRecipe;

  constructor(
    private _patientService: PatientService,
    private _authService: AuthenticationService,
    private _router: Router,
    private messageService: MessageService,
    private _nutritionistService: NutritionistService,
    public dialogService: DialogService
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
    this.cols = [
      { field: 'day', header: 'Day' },
      { field: 'recipeName', header: 'Recipe' },
      { field: 'mealType', header: 'Meal' },
      { field: 'portion', header: 'Portion' }
    ];
    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }
  getRecipe(recipeId){
    this._nutritionistService.getRecipeById(recipeId).subscribe((data) => {
      this.recipeDetail = data;
      this.showModal(data);
    })
  }
  showModal(recipe){
    const ref = this.dialogService.open(RecipleModalDialogComponent, {
      data: recipe,
      header: 'Recipe Detail',
      width: '70%'
    });
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
  exportPdf() {
    import("jspdf").then(jsPDF => {
        import("jspdf-autotable").then(autoTable => {
            const doc = new jsPDF.default('p', 'pt');
            (doc as any).autoTable(this.exportColumns, this.mealPlans);
            doc.save('meal-plans.pdf');
        })
    })
}

exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.mealPlans);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "meal-plans");
    });
}
  saveAsExcelFile(buffer: any, fileName: string): void {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
