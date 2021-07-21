import { Helper } from '../../helper/helper';

describe('successful scenario tests - meal plan', () => {
  const helper = new Helper();

    it('should be able to view generated meal plan', () => {
        helper.signInStartDashboardPatient();
        cy.get("[routerLink='/meal-plans']").click()
        cy.contains("Day")
        cy.contains("Recipe")
        cy.contains("Meal")
        cy.contains("Portion")
    });

    it('should have the download buttons', () => {
        helper.signInStartDashboardPatient();
        cy.get("[routerLink='/meal-plans']").click()
        cy.get("#downloadXlsx").should("exist")
        cy.get("#downloadPdf").should("exist")
    });

    it('should have breakfast, lunch, and dinner for a given day', () => {
        helper.signInStartDashboardPatient();
        cy.get("[routerLink='/meal-plans']").click()
        cy.get("td:first button:first").should("exist")
        cy.get("td:first button:first").click()
        cy.contains("Breakfast")
        cy.contains("Lunch")
        cy.contains("Dinner")
    });

    it('should see recipe details when clicked', () => {
        helper.signInStartDashboardPatient();
        cy.get("[routerLink='/meal-plans']").click()
        cy.get("td:first button:first").should("exist")
        cy.get("td:first button:first").click()
        cy.get("tr").eq(2).find("a").should("exist")
        cy.get("tr").eq(2).find("a").click()
        cy.contains("Recipe Detail")
        cy.contains("Instructions")
    });

});