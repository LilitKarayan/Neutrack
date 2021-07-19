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

  it('should edit recipe product', () => {
    helper.signInStartDashboard();
    recipeHelper.directToRecipe();

    cy.get('mat-accordion mat-expansion-panel:last')
      .click()
      .then(() => {
        cy.get('mat-accordion mat-expansion-panel:last button:first').click();
      });

    cy.get('mat-form-field:last')
      .click()
      .then(() => {
        cy.get('mat-form-field:last').clear();
        cy.get('mat-form-field:last').type('167');
      });

    cy.get('#addButton').click();
    cy.wait(5000);

    cy.get('mat-accordion mat-expansion-panel:last')
      .click()
      .then(() => {
        cy.contains('167');
      });
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

  it('should edit recipe product', () => {
    helper.signInStartDashboard();
    recipeHelper.directToRecipe();

    cy.get('mat-accordion mat-expansion-panel:last')
      .click()
      .then(() => {
        cy.get('mat-accordion mat-expansion-panel:last button:first').click();
      });

    cy.get('mat-form-field:last')
      .click()
      .then(() => {
        cy.get('mat-form-field:last').clear();
        cy.get('mat-form-field:last').type('167');
      });

    cy.get('#addButton').click();
    cy.wait(5000);

    cy.get('mat-accordion mat-expansion-panel:last')
      .click()
      .then(() => {
        cy.contains('167');
      });
  });
});
