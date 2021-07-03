import { Helper } from '../../helper/helper';
import { CalculatorHelper } from '../../helper/calculatorHelper';

describe('successful scenario tests - calculator', () => {
  const helper = new Helper();
  const calculatorHelper = new CalculatorHelper();

  it('should have submit button disabled but clear button enabled initially', () => {
    helper.signInStartDashboard();
    cy.contains('Calculator');
    cy.get("[routerLink='/calculator']").click();
    cy.get("#submitButton").should("be.disabled");
    cy.get("#clearButton").should("be.enabled");
  });

  it('should have field values empty initially', () => {
    helper.signInStartDashboard();
    cy.contains('Calculator');
    cy.get("[routerLink='/calculator']").click();
    calculatorHelper.initValues();
  });

  it('should clear all fields', () => {
    helper.signInStartDashboard();
    calculatorHelper.calculatorFilledOut();

    cy.get("#clearButton").click()
    calculatorHelper.initValues();
  });

  it('should enable with all field filled out correctly', () => {
    helper.signInStartDashboard();
    calculatorHelper.calculatorFilledOut();

    cy.get("#submitButton").should("be.enabled");
  });

  it('should direct to calculator results page', () => {
    helper.signInStartDashboard();
    calculatorHelper.calculatorFilledOut();

    cy.get("#submitButton").click();
    cy.contains("Results");
  });

  it('should return correct bmi weight, category, daily intake, and goal intake', () => {
    helper.signInStartDashboard();
    calculatorHelper.calculatorFilledOut();

    cy.get("#submitButton").click();

    cy.contains("19.1")
  });
});