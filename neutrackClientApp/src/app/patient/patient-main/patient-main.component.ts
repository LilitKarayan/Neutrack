import { PatientService } from './../../services/patient.service';
import { Component, OnInit } from '@angular/core';
import { IUser, IPatient, WeightHistory } from '@models';
import { AuthenticationService } from '@services/authentication.service';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ActivatedRoute, Router} from '@angular/router'
import {ActivityLevelPipe} from '../../shared/activity-level.pipe'

@Component({
  selector: 'app-patient-main',
  templateUrl: './patient-main.component.html',
  styleUrls: ['./patient-main.component.css']
})
export class PatientMainComponent implements OnInit {
  private patientSubject = new BehaviorSubject<IPatient> (null);
  activeUser: IUser;
  patient$: Observable<IPatient>;

  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: '#e02baa',
      backgroundColor: '#56ba88',
    },
    // #368030
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
    private patientService: PatientService,
  ) {
    this.authService.user.subscribe(user => this.activeUser = user);
    this.patient$ = this.patientSubject.asObservable();
  }

  ngOnInit(): void {
    this.patientService.getPatient(this.activeUser.id).subscribe(data => {
      this.patientSubject.next(data);
      this.dataset = this.getChartData(data.patientActivityHistories);
      this.labels = this.getChartLabel(data.patientActivityHistories);
    });
  }
  ngOnDestroy(): void {
    this.patientSubject.unsubscribe;
  }

  getChartData(history: WeightHistory[]): ChartDataSets[]{
    const weights = history.map(x => x.weight);
    const dataset = [
      {data: weights,
        label: 'Weight History'
      }
    ];
    return dataset;
  }
  getChartLabel(history: WeightHistory[]): Label[]{
    const labels = history.map(x => moment(x.createdDate).format('MMM DD YYYY'));
    return labels;
  }

}
