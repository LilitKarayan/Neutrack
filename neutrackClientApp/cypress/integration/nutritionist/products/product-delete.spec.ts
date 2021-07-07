import { ProductHelper } from '../../../helper/productHelper';
import { Helper } from '../../../helper/helper';

describe('successful scenario tests - delete product', () => {
  const helper = new Helper();
  const productHelper = new ProductHelper();

  it('should have delete button exist', () => {
    helper.signInStartDashboard();
    cy.get("[routerLink='/products']").click();
    productHelper.searchProduct("New Test");

    cy.get('#deleteButton').should('exist');
  });

  it('should have confirmation box appear', () => {
    helper.signInStartDashboard();
    cy.get("[routerLink='/products']").click();
    productHelper.searchProduct("New Test");

    cy.get('#deleteButton').click();
    cy.contains('Confirm action');
  });

  it('should not delete patient', () => {
    helper.signInStartDashboard();
    cy.get("[routerLink='/products']").click();
    productHelper.searchProduct("New Test");

    cy.get('#deleteButton').click();
    cy.get('#deleteNoButton')
      .click()
      .then(() => {
        cy.contains("New Test");
      });
  });

  it('should delete patient', () => {
    helper.signInStartDashboard();
    cy.get("[routerLink='/products']").click();
    productHelper.searchProduct("New Test");

    cy.get('#deleteButton').click();
    cy.get('#deleteYesButton')
      .click()
      .then(() => {
        cy.get('#deleteButton').should('not.exist');
      });
  });
});
