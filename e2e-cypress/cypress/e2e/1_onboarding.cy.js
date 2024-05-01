describe('template spec', () => {
  it('passes', () => {
    cy.visit('/');
    cy.get('h1').should('exist');
    cy.get('#blog-title').type('TSWDL');
    cy.get('#name').type('Admin');
    cy.get('#email').type(Cypress.env('email'));
    cy.get('#password').type(Cypress.env('password'));
    cy.get('button').click();
    cy.get('#ob-skip').click();
  });
});
