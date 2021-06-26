import { Helper } from '../helper/helper';

describe('successful scenario tests - sideNav', () => {
  const helper = new Helper();

  it('should contain access sign up nutritionist on login page - not signed in', () => {
    cy.visit('/login');
    cy.get('[id=navbarDropdownMenuLink]')
      .click()
      .then(() => {
        cy.contains('Nutritionist');
    });
  });

  it('should contain access to account and sign out - signed in', () => {
    helper.signInStartDashboard();
    cy.contains('Johnny').then(() => {
      cy.get('[id=navbarDropdownMenuLink]').click();
      cy.contains('My account');
      cy.contains('Sign Out');
    });
  });
});
