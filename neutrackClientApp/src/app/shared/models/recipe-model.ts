export interface IRecipe {
  id?: number;
  name?: string;
  instruction?: string;
  recipeProducts?: IRecipeProduct[]
}

export interface IRecipeProduct{
  recipeId?: number | 0;
  productId?: number | 0;
  weightInGrams?: number | 0;
}
