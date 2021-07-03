export class CalculatorHelper {
    initValues() {
        cy.get('[formcontrolname=height]').should('have.value', '');
        cy.get('[formcontrolname=weight]').should('have.value', '');
        cy.get('[formcontrolname=goal]').should('have.value', '');
        cy.get('[formcontrolname=activityLevel]').should('have.value', '');
        cy.get('[formcontrolname=age]').should('have.value', '');
        cy.get('[formcontrolname=gender]').should('have.value', null);
    }

    calculatorFilledOut() {
        cy.contains('Calculator');
        cy.get("[routerLink='/calculator']").click();
    
        cy.get('[formcontrolname=height]').click().then(() => {
          cy.get('[formcontrolname=height]').type('70');
        })
    
        cy.get('[formcontrolname=weight]').click().then(() => {
          cy.get('[formcontrolname=weight]').type('133');
        })
    
        cy.get('[formcontrolname=goal]').click().then(() => {
          cy.get('[formcontrolname=goal]').type('150');
        })
    
        cy.get('[formcontrolname=activityLevel]').click().then(() => {
          cy.get('[formcontrolname=activityLevel]').type('2');
        })
    
        cy.get('[formcontrolname=age]').click().then(() => {
          cy.get('[formcontrolname=age]').type('24');
        })
    
        cy.get('[formcontrolname=gender]').select('Male');
      }
}