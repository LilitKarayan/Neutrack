export class Helper {
  signInStartDashboard() {
    cy.visit('/login');

    cy.get('[formcontrolname=email]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=email]').type('tests@test.com');
      });

    cy.get('[formcontrolname=password]')
      .click()
      .then(() => {
        cy.get('[formcontrolname=password]').type('uwG-1234');
      })
      .then(() => {
        cy.get('button[type=submit]').click();
      })
  }
}
