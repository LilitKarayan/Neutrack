import { Helper } from '../../helper/helper';

describe('successful scenario tests - account', () => {
  const helper = new Helper();

  it('should direct to patient account page', () => {
    helper.signInStartDashboardPatient();
    cy.contains('George').then(() => {
      cy.get('[id=navbarDropdownMenuLink]')
        .click()
        .then(() => {
          cy.get('[routerLink="/account"]').click();
        });
    });

    cy.contains('Delete My Account');
  });

  it('should ask delete to patient account', () => {
    helper.signInStartDashboardPatient();

    cy.contains('George').then(() => {
      cy.get('[id=navbarDropdownMenuLink]')
        .click()
        .then(() => {
          cy.get('[routerLink="/account"]').click();
        });
    });

    cy.contains('Delete My Account').then(() => {
      cy.get('#deleteButton').click();
    });

    cy.contains('Confirm action');
  });

  it("should not delete account", () => {
    helper.signInStartDashboardPatient();

    cy.contains('George').then(() => {
        cy.get('[id=navbarDropdownMenuLink]')
          .click()
          .then(() => {
            cy.get('[routerLink="/account"]').click();
          });
      });
  
      cy.contains('Delete My Account').then(() => {
        cy.get('#deleteButton').click();
      });
  
      cy.contains('Confirm action').then(() => {
          cy.get("#deleteNoButton").click()
      });
      
      cy.contains("George Lucas")
  })

  it("should delete account", () => {
    cy.visit('/login');

    cy.get('[formcontrolname=email]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=email]').type('testing1234@test.com');
      });

    cy.get('[formcontrolname=password]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=password]').type('uwG-123456');
      })
      .then(() => {
        cy.get('button[type=submit]').click();
      })

      cy.contains('test').then(() => {
        cy.get('[id=navbarDropdownMenuLink]')
          .click()
          .then(() => {
            cy.get('[routerLink="/account"]').click();
          });
      });
  
      cy.contains('Delete My Account').then(() => {
        cy.get('#deleteButton').click();
      });
  
      cy.contains('Confirm action').then(() => {
          cy.get("#deleteYesButton").click()
      });
      
      cy.should('not.contain', "test")
  });
});
