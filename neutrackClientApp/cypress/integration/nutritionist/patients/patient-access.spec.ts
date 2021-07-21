import { PatientHelper } from '../../../helper/patientHelper';
import { Helper } from '../../../helper/helper';

describe('successful scenario tests - view patient', () => {
    const helper = new Helper();
    const patientHelper = new PatientHelper();

    it('should have access to actions of patient that belongs to nutritionist', () => {
        helper.signInStartDashboard();
        patientHelper.directToPatient();

        cy.get("#theSearch").click().then(() => {
            cy.get("#theSearch").type("Janice")
        })
    
        cy.get("#theSearchButton").click().then(() => {
            cy.contains("Janice Doe")

            cy.get("table td:last").find("a").should("have.length", 1)
            cy.get("table td:last").find("button").should("have.length", 2)
        })
    });

    it('should not have access to actions of patient that belongs to another nutritionist', () => {
        helper.signInStartDashboard();
        patientHelper.directToPatient();

        cy.get("#theSearch").click().then(() => {
            cy.get("#theSearch").type("patient")
        })
    
        cy.get("#theSearchButton").click().then(() => {
            cy.contains("Test Patient")
            cy.get("table td:last").find("a").should("not.exist")
            cy.get("table td:last").find("a").should("not.exist")
        })
    });

    it('should be able to add a patient that does not already have a nutritionist', () => {
        helper.signInStartDashboard();
        patientHelper.directToPatient();

        cy.get("#theSearch").click().then(() => {
            cy.get("#theSearch").type("george")
        })
    
        cy.get("#theSearchButton").click().then(() => {
            cy.contains("George Lucas")
            cy.get("table td:last").find("button").should("have.length", 1)
            cy.get("#add").should("exist")
        })
    });
});