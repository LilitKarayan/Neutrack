import { Helper } from '../../../helper/helper';

describe('successful scenario tests - Nutritionist Generate meal plan', () => {
  const helper = new Helper();

  it('should be able to access meal plan pop up', () => {
    helper.signInStartDashboard();
    cy.get("[routerLink='/patients']").click();

    cy.get('table td:last').find('a').click();
    cy.get('#generateMealPlan').should("exist");
    cy.get('#generateMealPlan').click().then(() => {
        cy.contains("Generate Meal Plan")
    })
  });

  it('should generate a meal plan', () => {
    // helper.signInStartDashboard();
    // cy.get("[routerLink='/patients']").click();

    // cy.get('table td:last').find('a').click();
    // cy.get('#generateMealPlan').should("exist");
    // cy.get('#generateMealPlan').click().then(() => {
    //     cy.contains("Generate Meal Plan")
    // })
    // cy.get('[formcontrolname=dailyCalories]').click().then(() => {
    //     cy.get('[formcontrolname=dailyCalories]').type("1000")
    //     cy.get('[formcontrolname=numberOfDays]').type("{leftarrow}")
    //     cy.get('[formcontrolname=numberOfDays]').type("{leftarrow}")
    // })

    // cy.get('#submitButton').click()
    
    // cy.get('[id=navbarDropdownMenuLink]').click();
    // cy.get("#signOut").click()

    helper.signInStartDashboardPatient();
    cy.get("[routerLink='/meal-plans']").click().then(() => {
        cy.contains("Day 1")
        cy.contains("Day 2")
        cy.should("not.contain", "Day 3")
    })
  });
});
