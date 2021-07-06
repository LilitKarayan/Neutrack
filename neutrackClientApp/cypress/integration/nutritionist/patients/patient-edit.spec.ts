import { PatientHelper } from '../../../helper/patientHelper';
import { Helper } from '../../../helper/helper';

describe('successful scenario tests - edit patient', () => {
    const helper = new Helper();
    const patientHelper = new PatientHelper();

    
    it('should have edit button exist', () => {
        helper.signInStartDashboard();
        patientHelper.directToPatient();

        cy.get(".edit-button").should("exist");
    });
});