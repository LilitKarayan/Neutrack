describe('successful scenario tests - signUp', () => {
  it('should route to sign up page', () => {
    cy.visit('/signup');
    cy.contains('Sign Up');
  });

  it('should have empty text and disabled button', () => {
    cy.visit('/signup');

    cy.get('[formcontrolname=email]').should('have.value', '');
    cy.get('[formcontrolname=password]').should('have.value', '');
    cy.get('[formcontrolname=confirmationPassword]').should('have.value', '');
    cy.get('[formcontrolname=firstName]').should('have.value', '');
    cy.get('[formcontrolname=lastName]').should('have.value', '');
    cy.get('[formcontrolname=dateOfBirth]').should('have.value', '');
    cy.get('[formcontrolname=phoneNumber]').should('have.value', '');
    cy.get('[formcontrolname=gender]').should('have.value', '');
    cy.get('[formcontrolname=yearsOfExperience]').should('have.value', '');

    cy.get('button[type=submit]').should('be.disabled');
  });

  it('should correctly add text to input element', () => {
    cy.visit('/signup');

    cy.get('[formcontrolname=email]').click().then(() => {
      cy.get('[formcontrolname=email]').type('Hello, World');
    }).then(() => {
      cy.get('[formcontrolname=email]').should('have.value', 'Hello, World');
    })
  });

  it('should have submit button remain disabled - non matching password', () => {
    cy.visit('/signup');

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

    // cy.get('#male').check()

    cy.get('[formcontrolname=yearsOfExperience]').click().then(() => {
      cy.get('[formcontrolname=yearsOfExperience]').type('3');
    }).then(() => {
      cy.get('button[type=submit]').should('be.enabled');
    })
  });

  it('should have submit button become enabled', () => {
    cy.visit('/signup');

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

    // cy.get('#male').check()

    cy.get('[formcontrolname=yearsOfExperience]').click().then(() => {
      cy.get('[formcontrolname=yearsOfExperience]').type('3');
    }).then(() => {
      cy.get('button[type=submit]').should('be.enabled');
    })
  });
});
