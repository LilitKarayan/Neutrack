import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
  public calculator: object;
  public bmiInt: number;
  public bmiCategory: string;
  public currentDailyCalories: number;
  public goalDailyCalories: number;
  public form: FormGroup;
  public genders: string[];
  public calculated: boolean;

  constructor() {}

  ngOnInit(): void {
    this.genders = ['Male', 'Female', 'Other'];
    this.calculator = {};
    this.bmiInt = 0;
    this.bmiCategory = '';
    this.currentDailyCalories = 0;
    this.goalDailyCalories = 0;
    this.form = new FormGroup({
      height: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      goal: new FormControl('', Validators.required),
      activityLevel: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
    });

    this.calculated = false;
  }

  getCalculator(): object {
    return this.calculator;
  }

  getBmi(weight: number, height: number): number {
    this.bmiInt = (703 * weight) / Math.pow(height, 2);

    return this.bmiInt;
  }

  getBmiCategory(): string {
    if (this.bmiInt < 18.5) {
      this.bmiCategory = 'underweight';
    } else if (this.bmiInt >= 18.5 && this.bmiInt <= 24.9) {
      this.bmiCategory = 'normal';
    } else if (this.bmiInt >= 25 && this.bmiInt <= 29.9) {
      this.bmiCategory = 'overweight';
    } else {
      this.bmiCategory = 'obese';
    }

    return this.bmiCategory;
  }

  getDailyCalories(
    gender: string,
    weight: number,
    height: number,
    age: number,
    activityLevel: number
  ): number {
    let bmr: number = 0;
    let dailyCalories: number = 0;

    if (gender === 'Male') {
      bmr = 66 + 6.3 * weight + 12.9 * height - 6.8 * age;
      dailyCalories = bmr * this.activityFactor(activityLevel);
    } else if (gender === 'Female') {
      bmr = 655 + 4.3 * weight + 4.7 * height - 4.7 * age;
      dailyCalories = bmr * this.activityFactor(activityLevel);
    } else {
      bmr = 655 + 4.3 * weight + 4.7 * height - 4.7 * age;
      dailyCalories = bmr * this.activityFactor(activityLevel);
    }

    return dailyCalories;
  }

  activityFactor(activityLevel: number): number {
    let factor: number = 0;

    if (activityLevel == 0) {
      factor = 1.2;
    } else if (activityLevel >= 1 && activityLevel <= 2) {
      factor = 1.375;
    } else if (activityLevel >= 3 && activityLevel <= 4) {
      factor = 1.55;
    } else if (activityLevel >= 5 && activityLevel <= 6) {
      factor = 1.725;
    } else {
      factor = 1.9;
    }

    return factor;
  }

  setCalculator(): void {
    this.calculator['height'] = this.form.controls['height'].value;
    this.calculator['weight'] = this.form.controls['weight'].value;
    this.calculator['goal'] = this.form.controls['goal'].value;
    this.calculator['activityLevel'] =
      this.form.controls['activityLevel'].value;
    this.calculator['age'] = this.form.controls['age'].value;
    this.calculator['gender'] = this.form.controls['age'].value;
  }

  onSubmit() {
    this.getBmi(this.calculator['height'], this.calculator['weight']);
    this.getBmiCategory();
    this.currentDailyCalories = this.getDailyCalories(
      this.calculator['gender'],
      this.calculator['weight'],
      this.calculator['height'],
      this.calculator['age'],
      this.calculator['activityLevel']
    );

    this.goalDailyCalories = this.getDailyCalories(
      this.calculator['gender'],
      this.calculator['weight'],
      this.calculator['height'],
      this.calculator['age'],
      this.calculator['activityLevel']
    );

    this.calculated = true;
  }

  clear() {
    this.form.reset('');
  }
}
