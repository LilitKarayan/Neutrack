import { ActivatedRoute, Router} from '@angular/router'
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { NutritionistService } from '@services/nutritionist.service';
import { IUser, IPatient, WeightHistory } from '@models';
import { AuthenticationService } from '@services/authentication.service';
import * as moment from 'moment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css']
})
export class PatientInfoComponent implements OnInit, OnDestroy {
  private patientSubject = new BehaviorSubject<IPatient> (null);
  activeUser: IUser;
  patient$: Observable<IPatient>;

  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType:ChartType = 'line';
  public lineChartPlugins = [];
  public dataset:ChartDataSets[];
  public labels: Label[];

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthenticationService,
      private nutritionistService: NutritionistService
  ) {
    this.authService.user.subscribe(user => this.activeUser = user);
    this.patient$ = this.patientSubject.asObservable();
    }
  ngOnDestroy(): void {
    this.patientSubject.unsubscribe;
  }
    ngOnInit(): void {
      const patientId = Number(this.route.snapshot.params['id']);
      if(patientId && this.activeUser.nutritionistId){
        this.nutritionistService.getANutritionistPatient(this.activeUser.nutritionistId, patientId).subscribe(data => {
          this.patientSubject.next(data);
          this.dataset = this.getChartData(data.patientActivityHistories);
          this.labels = this.getChartLabel(data.patientActivityHistories);
        });
      }
      else {
        throw new Error('Unable to get patient information');
      }
    }
    getChartData(history: WeightHistory[]): ChartDataSets[]{
      const weights = history.map(x => x.weight);
      const dataset = [
        {data: weights,
          label: 'Weight History'
        }
      ];
      console.log(dataset);
      return dataset;
    }
    getChartLabel(history: WeightHistory[]): Label[]{
      const labels = history.map(x => moment(x.createdDate).format('MMM DD YYYY'));
      return labels;
    }
}
