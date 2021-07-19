import { SignUpHelper } from "../helper/signUpHelper";

describe('successful scenario tests - signUp', () => {
  const signUpHelper = new SignUpHelper

  it('should route to sign up page', () => {
    cy.visit('/signup/nutritionist');
    cy.contains('Sign Up As A');
    cy.contains('Nutritionist');
  });

  it('should have empty text and disabled button', () => {
    cy.visit('/signup/nutritionist');

    signUpHelper.initValues();

    cy.get('button[type=submit]').should('be.disabled');
  });

  it('should correctly add text to input element', () => {
    cy.visit('/signup/nutritionist');

    cy.get('[formcontrolname=email]').click().then(() => {
      cy.get('[formcontrolname=email]').type('Hello, World');
    }).then(() => {
      cy.get('[formcontrolname=email]').should('have.value', 'Hello, World');
    })
  });

  it('should have submit button remain disabled - non matching password', () => {
    cy.visit('/signup/nutritionist');

    cy.get('[formcontrolname=email]').click().then(() => {
      cy.get('[formcontrolname=email]').type('test@test.com');
    })

    cy.get('[formcontrolname=password]').click().then(() => {
      cy.get('[formcontrolname=password]').type('uwG-1234');
    })

    cy.get('[formcontrolname=confirmationPassword]').click().then(() => {
      cy.get('[formcontrolname=confirmationPassword]').type('uwg-1234');
    })

    cy.get('[formcontrolname=firstName]').click().then(() => {
      cy.get('[formcontrolname=firstName]').type('johnny');
    })

    cy.get('[formcontrolname=lastName]').click().then(() => {
      cy.get('[formcontrolname=lastName]').type('test');
    })

    cy.get('[formcontrolname=dateOfBirth]').click().then(() => {
      cy.get('[formcontrolname=dateOfBirth]').type('2002-12-01');
    })

    cy.get('[formcontrolname=phoneNumber]').click().then(() => {
      cy.get('[formcontrolname=phoneNumber]').type('123-456-7890');
    })

    cy.get('[formcontrolname=gender]').select('Female');

    cy.get('[formcontrolname=yearsOfExperience]').click().then(() => {
      cy.get('[formcontrolname=yearsOfExperience]').type('3');
    }).then(() => {
      cy.get('button[type=submit]').should('be.disabled');
    })
  });

  it('should have submit button become enabled', () => {
    cy.visit('/signup/nutritionist');

    cy.get('[formcontrolname=email]').click().then(() => {
      cy.get('[formcontrolname=email]').type('test@test.com');
    })

    cy.get('[formcontrolname=password]').click().then(() => {
      cy.get('[formcontrolname=password]').type('uwG-1234');
    })

    cy.get('[formcontrolname=confirmationPassword]').click().then(() => {
      cy.get('[formcontrolname=confirmationPassword]').type('uwG-1234');
    })

    cy.get('[formcontrolname=firstName]').click().then(() => {
      cy.get('[formcontrolname=firstName]').type('johnny');
    })

    cy.get('[formcontrolname=lastName]').click().then(() => {
      cy.get('[formcontrolname=lastName]').type('test');
    })

    cy.get('[formcontrolname=dateOfBirth]').click().then(() => {
      cy.get('[formcontrolname=dateOfBirth]').type('2002-12-01');
    })

    cy.get('[formcontrolname=phoneNumber]').click().then(() => {
      cy.get('[formcontrolname=phoneNumber]').type('123-456-7890');
    })

    cy.get('[formcontrolname=gender]').select('Female');

    cy.get('[formcontrolname=yearsOfExperience]').click().then(() => {
      cy.get('[formcontrolname=yearsOfExperience]').type('3');
    }).then(() => {
      cy.get('button[type=submit]').should('be.enabled');
    })
  });
});
