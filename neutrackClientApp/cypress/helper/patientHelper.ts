export class PatientHelper {
  directToPatient() {
    cy.get("[routerLink='/patients']").click();
  }

  directToAddPatient() {
    cy.get("[routerLink='/patients']").click();
    cy.get('.addPatient').click();
  }

  initValues() {
    cy.get('[formcontrolname=firstName]').should('have.value', '');
    cy.get('[formcontrolname=lastName]').should('have.value', '');
    cy.get('[formcontrolname=gender]').should('have.value', null);
    cy.get('[formcontrolname=dateOfBirth]').should('have.value', '');
    cy.get('[formcontrolname=email]').should('have.value', '');
    cy.get('[formcontrolname=phoneNumber]').should('have.value', '');
  }

  addPatientFilledOut() {
    cy.get('[formcontrolname=firstName]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=firstName]').type('Janice');
      });

    cy.get('[formcontrolname=lastName]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=lastName]').type('Doe');
      });

    cy.get('[formcontrolname=gender]').select('Female');

    cy.get('[formcontrolname=dateOfBirth]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=dateOfBirth]').type('1986-12-01');
      });

    cy.get('[formcontrolname=email]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=email]').type('janiceDoe@hello.com');
      });

    cy.get('[formcontrolname=phoneNumber]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=phoneNumber]').type('333-444-3333');
      });
  }

  editPatientFilledOut() {
    cy.get('[formcontrolname=height]')
    .click()
    .then(() => {
      cy.get('[formcontrolname=height]').type('5.40');
    });

    cy.get('[formcontrolname=weight]')
    .click()
    .then(() => {
      cy.get('[formcontrolname=weight]').type('160');
    });

    cy.get('[formcontrolname=activityLevel]')
    .click()
    .then(() => {
      cy.get('[formcontrolname=activityLevel]').type('4');
    });

    cy.get('[formcontrolname=goal]')
    .click()
    .then(() => {
      cy.get('[formcontrolname=goal]').type('140');
    });
  }
}
