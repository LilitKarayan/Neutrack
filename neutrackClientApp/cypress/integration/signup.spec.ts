describe('successful scenario tests', () => {
  it('should route to sign up page', () => {
    cy.visit('/signup');
    cy.contains('Sign Up');
  });
});
