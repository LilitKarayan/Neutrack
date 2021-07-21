import { Helper } from '../../helper/helper';

describe('successful scenario tests - meal plan', () => {
  const helper = new Helper();

    it('should be able to view generated meal plan', () => {
      helper.signInStartDashboardPatient();
      cy.get("[routerLink='/meal-plans']").click()
  
      cy.get("table").find('tr').should('have.length', 3)
      cy.get("table").should('contain', "Test Testing")
  
      cy.get("#theSearch").click().then(() => {
          cy.get("#theSearch").type("Janice")
      })
  
      cy.get("#theSearchButton").click().then(() => {
          cy.get("table").find('tr').should('have.length', 2)
          cy.get("table").should('not.contain', "Test Testing")
      })
    });

});