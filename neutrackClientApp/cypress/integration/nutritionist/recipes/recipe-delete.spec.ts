import { RecipeHelper } from '../../../helper/recipeHelper';
import { Helper } from '../../../helper/helper';

describe('successful scenario tests - delete recipe', () => {
  const helper = new Helper();
  const recipeHelper = new RecipeHelper();

  it('should have button to delete recipe - Pepperoni pizza', () => {
    helper.signInStartDashboard();
    recipeHelper.directToRecipe();

    cy.get('mat-accordion mat-expansion-panel:last')
      .click()
      .then(() => {
        cy.get('mat-accordion mat-expansion-panel:last button:last').should(
          'exist'
        );
      });
  });

  it('should have confirmation box appear', () => {
    helper.signInStartDashboard();
    recipeHelper.directToRecipe();

    cy.get('mat-accordion mat-expansion-panel:last')
      .click()
      .then(() => {
        cy.get('mat-accordion mat-expansion-panel:last button:last').click();
      });

    cy.contains('Confirm action');
  });

  it('should not delete patient', () => {
    helper.signInStartDashboard();
    recipeHelper.directToRecipe();

    cy.get('mat-accordion mat-expansion-panel:last')
      .click()
      .then(() => {
        cy.get('mat-accordion mat-expansion-panel:last button:last').click();
      });

    cy.get('#deleteNoButton')
      .click()
      .then(() => {
        cy.get('mat-accordion mat-expansion-panel:last').contains("Pizza Pinapple");
      });
  });

  it('should delete patient', () => {
    helper.signInStartDashboard();
    recipeHelper.directToRecipe();

    cy.get('mat-accordion mat-expansion-panel:last')
    .click()
    .then(() => {
      cy.get('mat-accordion mat-expansion-panel:last button:last').click();
    });

    cy.get('#deleteYesButton')
      .click()
      .then(() => {
        cy.get('mat-accordion mat-expansion-panel:last').should('not.contain', 'Pizza Pinapple');
      });
  });
});
