
export const userLoginEndpoint = "/users/login";
export const userSignUpEndpoint = "/users/newuser";
export const nutritionistSignUpEndpoint = "/users/newnutritionist";
export const nutritionistAddPatientEndpoint = "/nutritionists/addpatient";
export const nutritionistGetAllPatients = (nutritionistId: number) => {
  return `/nutritionists/${nutritionistId}/patients`;
}
export const nutritionistGetAPatient = (nutritionistId: number, patientId: number) => {
  return `/nutritionists/${nutritionistId}/patients/${patientId}`;
}
export const nutritionistDeleteAPatient = (nutritionistId: number, patientId: number) => {
  return `/nutritionists/${nutritionistId}/patients/${patientId}`;
}
export const getNutritionist = (nutritionistId: number) => {
  return `/nutritionists/${nutritionistId}`;
}
export const nutritionistUpdatePatient = (nutritionistId: number, patientId: number) => {
  return `/nutritionists/${nutritionistId}/patients/${patientId}/update`;
}
export const  nutritionistDashboardData = (nutritionistId: number) => {
  return `/nutritionists/${nutritionistId}/dashboard`;
}
export const updateNutritionist = (nutritionistId: number) => {
  return `/nutritionists/${nutritionistId}`;
}
export const getProducts = `/products`
export const getProductById = (productId) => {
  return `/products/${productId}`;
}
export const updateProduct = (productId) => {
  return `/products/${productId}`;
}
export const deleteProduct = (productId) => {
  return `/products/${productId}`;
}
export const createProduct = '/products/newproduct';
export const searchProduct = (name) => {
  return `/products/search/${name}`;
}
export const getRecipes = '/recipes'
export const getRecipeById = (recipeId) => {
  return `/recipes/${recipeId}`
}
export const createRecipe = '/recipes/newrecipe';
export const deleteRecipe = (recipeId) => {
  return `/recipes/${recipeId}`;
}
export const updateRecipe = (recipeId) => {
  return `/recipes/${recipeId}`;
}
