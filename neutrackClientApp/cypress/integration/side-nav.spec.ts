import { Helper } from "../helper/helper";

describe('successful scenario tests - sideNav', () => {
const helper = new Helper();

  it('should contain all sections of the side nav', () => {
    helper.signInStartDashboard();
    cy.contains('Dashboard');
    cy.contains('Patients');
    cy.contains('Calculator');
  });

  it('should direct to dashboard', () => {
    helper.signInStartDashboard();
    cy.get("[routerLink='/dashboard']").click().then(() => {
      cy.contains('List of the active patients');
    });
  });

  it('should direct to patients', () => {
    helper.signInStartDashboard();
    cy.get("[routerLink='/patients']").click().then(() => {
      cy.contains('List of Patients');
    });
  });

  it('should direct to calculator', () => {
    helper.signInStartDashboard();
    cy.get("[routerLink='/calculator']").click().then(() => {
      cy.contains('BMI & Calorie Calculator');
    });
  });
});
