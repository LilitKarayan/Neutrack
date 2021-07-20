import { Helper } from '../helper/helper';
import { PatientHelper } from '../helper/patientHelper';
import { ProductHelper } from '../helper/productHelper';

describe('successful scenario tests - search', () => {
  const helper = new Helper();
  const patientHelper = new PatientHelper();
  const productHelper = new ProductHelper();

  it('should search for one patient', () => {
    helper.signInStartDashboard();
    cy.get("[routerLink='/patients']").click()

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

  it('should search for one product', () => {
    helper.signInStartDashboard();
    cy.get("[routerLink='/products']").click()

    cy.get("table").find('tr').should('have.length', 11)
    cy.get("table").should('contain', "Abiyuch, raw")

    cy.get("#theSearch").click().then(() => {
        cy.get("#theSearch").type("Cornstarch")
    })

    cy.get("#theSearchButton").click().then(() => {
        cy.get("table").find('tr').should('have.length', 2)
        cy.get("table").should('not.contain', "Abiyuch, raw")
    })
  });
});