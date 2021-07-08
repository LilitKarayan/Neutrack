export class RecipeHelper {
  directToRecipe() {
    cy.get("[routerLink='/recipes']").click();
  }

  directToAddRecipe() {
    cy.get("[routerLink='/recipes']").click();
    cy.get('.addrecipe').click();
  }

  initValues() {
    cy.get('[formcontrolname=name]').should('have.value', '');
    cy.get('[formcontrolname=instruction]').should('have.value', '');
  }

  addRecipeFilledOut() {
    cy.get('[formcontrolname=name]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=name]').clear();
        cy.get('[formcontrolname=name]').type('Pepperoni Pizza');
      });

    cy.get('[formcontrolname=instruction]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=instruction]').clear();
        cy.get('[formcontrolname=instruction]').type(
          'Preheat dough, heat dough, apply cheese'
        );
      });

    cy.get('#productButton')
      .click()
      .then(() => {
        cy.get('[formcontrolname=productName]').clear();
        cy.get('[formcontrolname=productName]').type('Cornstarch');

        cy.get('[formcontrolname=weightInGrams]').clear();
        cy.get('[formcontrolname=weightInGrams]').type('2');
      });
  }

  editRecipeFilledOut() {
    cy.get('[formcontrolname=name]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=name]').clear();
        cy.get('[formcontrolname=name]').type('Pizza Pinapple');
      });

    cy.get('[formcontrolname=instruction]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=instruction]').clear();
        cy.get('[formcontrolname=instruction]').type(
          'Flip three times, apply pinapples'
        );
      });
  }
}
