import { SignUpHelper } from '../helper/signUpHelper';

describe('successful scenario tests - signUp', () => {
  const signUpHelper = new SignUpHelper();

  it('should route to sign patient page', () => {
    cy.visit('/signup/patient');
    cy.contains('Sign Up As A');
    cy.contains('Patient');
  });

  it('should have empty text and disabled button', () => {
    cy.visit('/signup/patient');

    signUpHelper.initValuesPatient();

    cy.get('button[type=submit]').should('be.disabled');
  });

  it('should correctly add text to input element', () => {
    cy.visit('/signup/patient');

    cy.get('[formcontrolname=email]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=email]').type('Hello, World');
      })
      .then(() => {
        cy.get('[formcontrolname=email]').should('have.value', 'Hello, World');
      });
  });

  it('should have submit button remain disabled - non matching password', () => {
    cy.visit('/signup/patient');

    cy.get('[formcontrolname=firstName]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=firstName]').type('George');
      });

    cy.get('[formcontrolname=lastName]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=lastName]').type('Lucas');
      });

    cy.get('[formcontrolname=dateOfBirth]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=dateOfBirth]').type('1992-11-01');
      });

    cy.get('[formcontrolname=phoneNumber]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=phoneNumber]').type('987-654-3210');
      });

    cy.get('[formcontrolname=gender]').select('Male');

    cy.get('[formcontrolname=activityLevel]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=activityLevel]').type('3');
      });
    cy.get('[formcontrolname=height]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=height]').type('7.8');
      });
    cy.get('[formcontrolname=weight]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=weight]').type('167.90');
      });
    cy.get('[formcontrolname=goal]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=goal]').type('152.00');
      });

    cy.get('[formcontrolname=email]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=email]').type('testing@test.com');
      });

    cy.get('[formcontrolname=password]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=password]').type('uwG-12345');
      });

    cy.get('[formcontrolname=confirmationPassword]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=confirmationPassword]').type('uwg-12345');
      });

    cy.get('button[type=submit]').should('be.disabled');
  });

  it('should have submit button become enabled', () => {
    cy.visit('/signup/patient');

    cy.get('[formcontrolname=firstName]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=firstName]').type('George');
      });

    cy.get('[formcontrolname=lastName]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=lastName]').type('Lucas');
      });

    cy.get('[formcontrolname=dateOfBirth]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=dateOfBirth]').type('1992-11-01');
      });

    cy.get('[formcontrolname=phoneNumber]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=phoneNumber]').type('987-654-3210');
      });

    cy.get('[formcontrolname=gender]').select('Male');

    cy.get('[formcontrolname=activityLevel]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=activityLevel]').type('3');
      });
    cy.get('[formcontrolname=height]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=height]').type('7.8');
      });
    cy.get('[formcontrolname=weight]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=weight]').type('167.90');
      });
    cy.get('[formcontrolname=goal]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=goal]').type('152.00');
      });

    cy.get('[formcontrolname=email]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=email]').type('testing@test.com');
      });

    cy.get('[formcontrolname=password]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=password]').type('uwG-12345');
      });

    cy.get('[formcontrolname=confirmationPassword]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=confirmationPassword]').type('uwG-12345');
      });

    cy.get('button[type=submit]').should('be.enabled');
  });
});
