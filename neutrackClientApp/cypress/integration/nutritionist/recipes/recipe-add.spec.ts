import { RecipeHelper } from '../../../helper/recipeHelper';
import { Helper } from '../../../helper/helper';

describe('successful scenario tests - add recipe', () => {
  const helper = new Helper();
  const recipeHelper = new RecipeHelper();

  it('should have button to add recipe', () => {
    helper.signInStartDashboard();
    recipeHelper.directToRecipe();

    cy.contains('Create Recipe');
  });

  it('should have popup to add product once button clicked', () => {
    helper.signInStartDashboard();

    recipeHelper.directToAddRecipe();

    cy.contains('Create Recipe');
    cy.contains('Add Product');
  });

  it('should have empty fields & add button disabled', () => {
    helper.signInStartDashboard();

    recipeHelper.directToAddRecipe();

    recipeHelper.initValues();
    cy.get('#addButton').should('be.disabled');
  });

  it('should have add button enabled', () => {
    helper.signInStartDashboard();

    recipeHelper.directToAddRecipe();

    recipeHelper.addRecipeFilledOut();
    cy.get('#addButton').should('be.enabled');
  });

  it('should successfully add product', () => {
    helper.signInStartDashboard();

    recipeHelper.directToAddRecipe();

    recipeHelper.addRecipeFilledOut();
    cy.get('#addButton')
      .click()
      .then(() => {
        cy.contains('Pepperoni Pizza');
      });
  });

});