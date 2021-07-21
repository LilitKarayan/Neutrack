export interface IGenerateMealPlan {
  patientId?: number;
  dailyCalories?: number;
  numberOfDays?: number;
}

export interface IMealPlan
{
  recipeID?: number;
  recipeName?: string;
  mealType?: string;
  patientID?: number;
  portion?: number;
  day?: number
}
