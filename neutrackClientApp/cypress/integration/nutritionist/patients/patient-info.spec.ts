import { PatientHelper } from '../../../helper/patientHelper';
import { Helper } from '../../../helper/helper';

describe('successful scenario tests - view patient', () => {
    const helper = new Helper();
    const patientHelper = new PatientHelper();

    it('should have portrait button exist', () => {
        helper.signInStartDashboard();
        patientHelper.directToPatient();

        cy.get("[href='/patients/2/details']").should("exist");
    });

    it('should have all of patients information', () => {
        helper.signInStartDashboard();
        patientHelper.directToPatient();

        cy.get("[href='/patients/2/details']").click();
        cy.contains("Jane Doe");
        cy.contains("janeDoe@hello.com");
        cy.contains("Female");
        cy.contains("333-333-3333");
        cy.contains("Height");
        cy.contains("Weight");
        cy.contains("Goal");
        cy.contains("Activity Level");
    });
});