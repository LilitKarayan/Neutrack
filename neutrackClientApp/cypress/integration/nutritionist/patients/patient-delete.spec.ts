import { PatientHelper } from '../../../helper/patientHelper';
import { Helper } from '../../../helper/helper';

describe('successful scenario tests - delete patient', () => {
    const helper = new Helper();
    const patientHelper = new PatientHelper();

    it('should have delete button exist', () => {
        helper.signInStartDashboard();
        patientHelper.directToPatient();

        cy.get("#deleteButton").should("exist");
    });

    it('should have confirmation box appear', () => {
        helper.signInStartDashboard();
        patientHelper.directToPatient();

        cy.get("#deleteButton").click();
        cy.contains("Confirm action");
    });

    it('should not delete patient', () => {
        helper.signInStartDashboard();
        patientHelper.directToPatient();

        cy.get("#deleteButton").click();
        cy.get("#deleteNoButton").click().then(() => {
            cy.contains("Jane Doe");
          });        
    });

    it('should delete patient', () => {
        helper.signInStartDashboard();
        patientHelper.directToPatient();

        cy.get("#deleteButton").click();
        cy.get("#deleteYesButton").click().then(() => {
            cy.get("#deleteButton").should("not.exist");
          });    
    });
});