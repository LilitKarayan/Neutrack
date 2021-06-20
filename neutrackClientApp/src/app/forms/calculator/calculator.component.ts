import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  public calculator: object;
  public bmiInt: number;
  public bmiCategory: string;
  public form: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.calculator = {};
    this.bmiInt = 0;
    this.bmiCategory = '';
    this.form = new FormGroup({
      height: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      goal: new FormControl('', Validators.required),
      activityLevel: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required)
    });
  }

  getCalculator(): object {
    return this.calculator;
  }

  getBmi(): number {
    return this.bmiInt;
  }

  getBmiCategory(): string {
    return this.bmiCategory;
  }

  clear() {
    this.form.reset('');
  }

  calculate() {
    this.setBmi();
    this.setCurrentWeightCaloriesPerDay();
    this.setGoalWeightCaloriesPerDay();
  }


  setCalculator(): void {
    this.calculator['height'] = this.form.controls['height'].value;
    this.calculator['weight'] = this.form.controls['weight'].value;
    this.calculator['goal'] = this.form.controls['goal'].value;
    this.calculator['activityLevel'] = this.form.controls['activityLevel'].value;
    this.calculator['age'] = this.form.controls['age'].value;
  }

  setBmi(): void {
    this.bmiInt = (703 * this.calculator['weight']) / Math.pow(this.calculator['height'], 2)
  }

  setBmiCategory(): void {
    if(this.bmiInt < 18.5) {
      this.bmiCategory = 'underweight';
    } else if(this.bmiInt >= 18.5 && this.bmiInt <= 24.9) {
      this.bmiCategory = 'normal';
    } else if(this.bmiInt >= 25 && this.bmiInt <= 29.9) {
      this.bmiCategory = 'overweight';
    } else {
      this.bmiCategory = 'obese';
    }
  }

  setCurrentWeightCaloriesPerDay(): void {

  }

  setGoalWeightCaloriesPerDay(): void {

  }

}
