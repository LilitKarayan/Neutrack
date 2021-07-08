import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculator-form',
  templateUrl: './calculator-form.component.html',
  styleUrls: ['./calculator-form.component.css']
})
export class CalculatorFormComponent implements OnInit {
  public calculator: object;
  public bmiCategory: string;
  public currentDailyCalories: string;
  public goalDailyCalories: string;
  public form: FormGroup;
  public genders: string[];
  public calculated: boolean;
  public direction: string;
  public amount: string;
  public bmi: string;
  public bmiInt: number;

  constructor() {}

  ngOnInit(): void {
    this.genders = ['Male', 'Female'];
    this.calculator = {};
    this.bmi = '';
    this.bmiInt = 0;
    this.bmiCategory = '';
    this.currentDailyCalories = '';
    this.goalDailyCalories = '';
    this.form = new FormGroup({
      height: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      goal: new FormControl('', Validators.required),
      activityLevel: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
    });

    this.calculated = false;
    this.direction = '';
    this.amount = '';
  }

  getCalculator(): object {
    return this.calculator;
  }

  getBmi(height: number, weight: number): string {
    this.bmiInt = (weight / Math.pow(height, 2)) * 703;

    return this.bmiInt.toFixed(2);
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
  ): string {
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

    return dailyCalories.toFixed(2);
  }

  getDirection(currentWeight: number, goalWeight: number): string {
    if(currentWeight < goalWeight) {
      this.direction = 'increase';
    } else if (currentWeight > goalWeight) {
      this.direction = 'decrease';
    } else {
      this.direction = 'change';
    }

    return this.direction;
  }

  getAmount(currentCalorie: string, goalCalorie: string): string {

    let amount = Math.abs(Number(currentCalorie) - Number(goalCalorie));

    return amount.toFixed(2);
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
    this.calculator['gender'] = this.form.controls['gender'].value;
  }

  onSubmit() {
    this.setCalculator();
    this.bmi = this.getBmi(this.calculator['height'], this.calculator['weight']);
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
      this.calculator['goal'],
      this.calculator['height'],
      this.calculator['age'],
      this.calculator['activityLevel']
    );

    this.getDirection(this.calculator['weight'], this.calculator['goal']);

    this.amount = this.getAmount(this.currentDailyCalories, this.goalDailyCalories);

    this.calculated = true;
  }

  clear() {
    this.form.reset('');
  }

}
