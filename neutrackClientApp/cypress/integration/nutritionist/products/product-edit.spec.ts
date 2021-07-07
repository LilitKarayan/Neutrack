import { ProductHelper } from '../../../helper/productHelper';
import { Helper } from '../../../helper/helper';

describe('successful scenario tests - edit product', () => {
  const helper = new Helper();
  const productHelper = new ProductHelper();

  it('should have button to edit product', () => {
    helper.signInStartDashboard();
    cy.get("[routerLink='/products']").click();
    productHelper.searchProduct("test");

    cy.get('.edit_button').should('exist');
  });

  it('should present edit popup', () => {
    helper.signInStartDashboard();
    cy.get("[routerLink='/products']").click();
    productHelper.searchProduct("test");

    cy.get('.edit_button').click();
    cy.contains('Edit Product');
  });

  it('should successfully edit product', () => {
    helper.signInStartDashboard();
    cy.get("[routerLink='/products']").click();
    productHelper.searchProduct("test");

    cy.get('.edit_button').click();

    productHelper.editProductFilledOut();
    cy.get('#addButton').click().then(() => {
        productHelper.searchProduct("New Test");
        cy.contains('300');
        cy.contains('5');
        cy.contains('6');
        cy.contains('22');
    });
  });
});
