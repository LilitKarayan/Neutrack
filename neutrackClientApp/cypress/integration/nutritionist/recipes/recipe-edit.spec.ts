import { RecipeHelper } from '../../../helper/recipeHelper';
import { Helper } from '../../../helper/helper';

describe('successful scenario tests - edit recipe', () => {
  const helper = new Helper();
  const recipeHelper = new RecipeHelper();

  it('should have button to edit recipe - Pepperoni Pizza', () => {
    helper.signInStartDashboard();
    recipeHelper.directToRecipe();

    cy.get('mat-accordion mat-expansion-panel:last')
      .click()
      .then(() => {
        cy.get('mat-accordion mat-expansion-panel:last button:first').should(
          'exist'
        );
      });
  });

  it('should present edit popup', () => {
    helper.signInStartDashboard();
    recipeHelper.directToRecipe();

    cy.get('mat-accordion mat-expansion-panel:last')
      .click()
      .then(() => {
        cy.get('mat-accordion mat-expansion-panel:last button:first').click();
      });

    cy.contains('Edit Recipe');
  });

  it('should successfully edit product', () => {
    helper.signInStartDashboard();
    recipeHelper.directToRecipe();

    cy.get('mat-accordion mat-expansion-panel:last')
      .click()
      .then(() => {
        cy.get('mat-accordion mat-expansion-panel:last button:first').click();
      });

    recipeHelper.editRecipeFilledOut();
    cy.get('#addButton').click();
    cy.get('mat-accordion mat-expansion-panel:last').click()
      .then(() => {
        cy.contains('Pizza Pinapple');
      });
  });
});
