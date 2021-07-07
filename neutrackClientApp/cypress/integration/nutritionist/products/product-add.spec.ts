import { ProductHelper } from '../../../helper/productHelper';
import { Helper } from '../../../helper/helper';

describe('successful scenario tests - add product', () => {
  const helper = new Helper();
  const productHelper = new ProductHelper();

  it('should have button to add product', () => {
    helper.signInStartDashboard();

    cy.get("[routerLink='/products']").click();
    cy.contains('Add a new product');
  });

  it('should have popup to add product once button clicked', () => {
    helper.signInStartDashboard();

    productHelper.directToProduct();

    cy.contains('Add new product');
  });

  it('should have empty fields & add button disabled', () => {
    helper.signInStartDashboard();

    productHelper.directToProduct();

    productHelper.initValues();
    cy.get('#addButton').should('have.class', 'button-color-validation');
  });

  it('should have add button enabled', () => {
    helper.signInStartDashboard();

    productHelper.directToProduct();

    productHelper.addProductFilledOut();
    cy.get('#addButton').should('not.have.class', 'button-color-validation');
  });

  it('should successfully add product', () => {
    helper.signInStartDashboard();

    productHelper.directToProduct();

    productHelper.addProductFilledOut();
    cy.get('#addButton')
      .click()
      .then(() => {
        productHelper.searchProduct("chips");

        cy.contains('Chips');
        cy.contains('150');
        cy.contains('2');
        cy.contains('10');
        cy.contains('15');
      });
  });
});
