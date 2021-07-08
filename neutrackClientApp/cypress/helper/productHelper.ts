export class ProductHelper {
  directToProduct() {
    cy.get("[routerLink='/products']").click();
    cy.get('.addProduct').click();
  }

  initValues() {
    cy.get('[formcontrolname=name]').should('have.value', '');
    cy.get('[formcontrolname=caloriesPerGram]').should('have.value', 0);
    cy.get('[formcontrolname=proteinInGrams]').should('have.value', 0);
    cy.get('[formcontrolname=fatInGrams]').should('have.value', 0);
    cy.get('[formcontrolname=carbInGrams]').should('have.value', 0);
  }

  addProductFilledOut() {
    cy.get('[formcontrolname=name]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=name]').clear();
        cy.get('[formcontrolname=name]').type('Chips');
      });

    cy.get('[formcontrolname=caloriesPerGram]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=caloriesPerGram]').clear();
        cy.get('[formcontrolname=caloriesPerGram]').type('150');
      });

    cy.get('[formcontrolname=proteinInGrams]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=proteinInGrams]').clear();
        cy.get('[formcontrolname=proteinInGrams]').type('2');
      });

    cy.get('[formcontrolname=fatInGrams]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=fatInGrams]').clear();
        cy.get('[formcontrolname=fatInGrams]').type('10');
      });

    cy.get('[formcontrolname=carbInGrams]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=carbInGrams]').clear();
        cy.get('[formcontrolname=carbInGrams]').type('15');
      });
  }

  searchProduct(product :string) {
    cy.get("#theSearch").clear();
    cy.get("#theSearch").click().then(() =>{
      cy.get("#theSearch").type(product);
      cy.get("#theSearchButton").click();
    });
  }

  editProductFilledOut() {
    cy.get('[formcontrolname=name]')
    .click()
    .then(() => {
      cy.get('[formcontrolname=name]').clear();
      cy.get('[formcontrolname=name]').type('New Test');
    });

  cy.get('[formcontrolname=caloriesPerGram]')
    .click()
    .then(() => {
      cy.get('[formcontrolname=caloriesPerGram]').clear();
      cy.get('[formcontrolname=caloriesPerGram]').type('300');
    });

  cy.get('[formcontrolname=proteinInGrams]')
    .click()
    .then(() => {
      cy.get('[formcontrolname=proteinInGrams]').clear();
      cy.get('[formcontrolname=proteinInGrams]').type('5');
    });

  cy.get('[formcontrolname=fatInGrams]')
    .click()
    .then(() => {
      cy.get('[formcontrolname=fatInGrams]').clear();
      cy.get('[formcontrolname=fatInGrams]').type('6');
    });

  cy.get('[formcontrolname=carbInGrams]')
    .click()
    .then(() => {
      cy.get('[formcontrolname=carbInGrams]').clear();
      cy.get('[formcontrolname=carbInGrams]').type('22');
    });
  }
}
