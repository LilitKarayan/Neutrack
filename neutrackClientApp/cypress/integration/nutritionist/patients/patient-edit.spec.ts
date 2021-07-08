import { PatientHelper } from '../../../helper/patientHelper';
import { Helper } from '../../../helper/helper';

describe('successful scenario tests - edit patient', () => {
    const helper = new Helper();
    const patientHelper = new PatientHelper();

    
    it('should have edit button exist', () => {
        helper.signInStartDashboard();
        patientHelper.directToPatient();

        cy.get(".edit_button").should("exist");
    });

    it('should present edit popup', () => {
        helper.signInStartDashboard();
        patientHelper.directToPatient();

        cy.get(".edit_button").click();
        cy.contains("Edit Patient");
    });

    it('should successfully edit patient', () => {
        helper.signInStartDashboard();
        patientHelper.directToPatient();

        cy.get(".edit_button").click();

        patientHelper.editPatientFilledOut();
        cy.get("#submitButton").click();
        cy.get("[href='/patients/2/details']").click();

        cy.contains("5.4");
        cy.contains("160");
        cy.contains("140");
        cy.contains("4");
    });
});