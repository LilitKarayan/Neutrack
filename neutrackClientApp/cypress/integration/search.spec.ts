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
    cy.get("#theSearch").click().then(() => {
        cy.get("#theSearch").type("John Doe")
    })
  });

  it('should search for one product', () => {
    helper.signInStartDashboard();
    cy.get("[routerLink='/products']").click()
    cy.get("#theSearch").click().then(() => {
        cy.get("#theSearch").type("Cornstarch")
    })
  });
});