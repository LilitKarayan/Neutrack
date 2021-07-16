export interface IRecipe {
  id?: number;
  name?: string;
  instruction?: string;
  recipeProducts?: IRecipeProduct[]
}

export interface IRecipeProduct{
  recipeID?: number | 0;
  productID?: number | 0;
  weightInGrams?: number | 0;
}
