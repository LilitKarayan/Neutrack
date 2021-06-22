describe('successful scenario tests - login', () => {
  it('should route to login page', () => {
    cy.visit('/login');
    cy.contains('Login');
  });

  it('should have empty text and disabled button', () => {
    cy.visit('/login');

    cy.get('[formcontrolname=email]').should('have.value', '');
    cy.get('[formcontrolname=password]').should('have.value', '');

    cy.get('button[type=submit]').should('be.disabled');
  });

  it('should correctly add text to input element', () => {
    cy.visit('/login');

    cy.get('[formcontrolname=email]').click().then(() => {
      cy.get('[formcontrolname=email]').type('Hello, World');
    }).then(() => {
      cy.get('[formcontrolname=email]').should('have.value', 'Hello, World');
    })
  });

  it('should have submit button remaining disabled - email', () => {
    cy.visit('/login');

    cy.get('[formcontrolname=email]').click().then(() => {
      cy.get('[formcontrolname=email]').type('test');
    })

    cy.get('[formcontrolname=password]').click().then(() => {
      cy.get('[formcontrolname=password]').type('uwG-1234');
    }).then(() => {
      cy.get('button[type=submit]').should('be.disabled');
    })
  });

  it('should have submit button remaining disabled - password', () => {
    cy.visit('/login');

    cy.get('[formcontrolname=email]').click().then(() => {
      cy.get('[formcontrolname=email]').type('test@test.com');
    })

    cy.get('[formcontrolname=password]').click().then(() => {
      cy.get('[formcontrolname=password]').type('123');
    }).then(() => {
      cy.get('button[type=submit]').should('be.disabled');
    })
  });

  it('should have submit button become enabled', () => {
    cy.visit('/login');

    cy.get('[formcontrolname=email]').click().then(() => {
      cy.get('[formcontrolname=email]').type('test@test.com');
    })

    cy.get('[formcontrolname=password]').click().then(() => {
      cy.get('[formcontrolname=password]').type('uwG-1234');
    }).then(() => {
      cy.get('button[type=submit]').should('be.enabled');
    })
  });

  it('should successfully login', () => {
    cy.visit('/login');

    cy.get('[formcontrolname=email]').click().then(() => {
      cy.get('[formcontrolname=email]').type('test@test.com');
    })

    cy.get('[formcontrolname=password]').click().then(() => {
      cy.get('[formcontrolname=password]').type('uwG-1234');
    }).then(() => {
      cy.get('button[type=submit]').click();
    }).then(() => {
      cy.contains('Johnny');
    })
  
  });
});
