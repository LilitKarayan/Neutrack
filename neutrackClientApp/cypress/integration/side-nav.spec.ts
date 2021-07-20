import { Helper } from "../helper/helper";

describe('successful scenario tests - sideNav', () => {
const helper = new Helper();

  it('should contain all sections of the side nav', () => {
    helper.signInStartDashboard();
    cy.contains('Dashboard');
    cy.contains('Patients');
    cy.contains('Calculator');
    cy.contains('Products');
    cy.contains('Recipes');
  });

  it('should direct to dashboard', () => {
    helper.signInStartDashboard();
    cy.get("[routerLink='/dashboard']").click().then(() => {
      cy.contains('Total Patients');
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

  it('should direct to product', () => {
    helper.signInStartDashboard();
    cy.get("[routerLink='/products']").click().then(() => {
      cy.contains('Products');
    });
  });

  it('should direct to recipes', () => {
    helper.signInStartDashboard();
    cy.get("[routerLink='/recipes']").click().then(() => {
      cy.contains('Recipes');
    });
  });

  it('should contain all sections of the side nav - patient', () => {
    helper.signInStartDashboardPatient();
    cy.contains('History');
    cy.contains('Calculator');
    cy.contains('Meal Plans');
  });

  it('should direct to history - patient', () => {
    helper.signInStartDashboardPatient();
    cy.get("[routerLink='/history']").click().then(() => {
      cy.contains('Weight');
    });
  });

  it('should direct to calculator - patient', () => {
    helper.signInStartDashboardPatient();
    cy.get("[routerLink='/calculator']").click().then(() => {
      cy.contains('BMI & Calorie Calculator');
    });
  });

  it('should direct to meal plans - patient', () => {
    helper.signInStartDashboardPatient();
    cy.get("[routerLink='/recipes']").click().then(() => {
      cy.contains('Meal Plans');
    });
  });
});