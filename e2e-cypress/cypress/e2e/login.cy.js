describe('Login', () => {
  it('should login succesfully', () => {
    cy.visit('/');
    cy.get('#identification').type(Cypress.env('email'));
    cy.get('#password').type(Cypress.env('password'));
    cy.get('[data-test-button="sign-in"]').click();
  });
});
