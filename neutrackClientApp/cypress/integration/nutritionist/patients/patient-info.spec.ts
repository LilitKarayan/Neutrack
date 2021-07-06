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
});