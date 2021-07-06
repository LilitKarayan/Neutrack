import { PatientHelper } from '../../../helper/patientHelper';
import { Helper } from '../../../helper/helper';

describe('successful scenario tests - add patient', () => {
    const helper = new Helper();
    const patientHelper = new PatientHelper();

    it('should have button to add patient', () => {
        helper.signInStartDashboard();

        cy.get("[routerLink='/patients']").click();
        cy.contains("Add a new patient");
    });

    it('should have popup to add patient once button clicked', () => {
        helper.signInStartDashboard();

        patientHelper.directToAddPatient();
        cy.contains("Add Patient");
    });

    it('should have empty fields & add button disabled', () => {
        helper.signInStartDashboard();

        patientHelper.directToAddPatient();

        patientHelper.initValues();
        cy.get("#addButton").should("have.class", "button-color-validation")
    });

    it('should have add button enabled', () => {
        helper.signInStartDashboard();

        patientHelper.directToAddPatient();

        patientHelper.addPatientFilledOut();
        cy.get("#addButton").should("not.have.class", "button-color-validation")
    });

    it('should successfully add patient', () => {
        helper.signInStartDashboard();

        patientHelper.directToAddPatient();

        patientHelper.addPatientFilledOut();
        cy.get("#addButton").click();

        cy.contains("Jane Doe");
        cy.contains("Female");
        cy.contains("18");
        cy.contains("janeDoe@hello.com");
    })
});