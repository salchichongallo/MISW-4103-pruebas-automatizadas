describe('Create a post', () => {
    beforeEach(() => {
      cy.visit('http://localhost:2368/ghost');
      cy.get('#identification').type(Cypress.env('email'));
      cy.wait(1000);
      cy.get('#password').type(Cypress.env('password'));
      cy.wait(1000);
      cy.get('[data-test-button="sign-in"]').click();
      cy.wait(2000);
    });
  
    it('As a user I log in, enter the Posts section, create a new Post and verify its creation in the Posts list', () => {
      cy.get('[data-test-nav="posts"]').click();
      cy.wait(2000);
      cy.get('[data-test-new-post-button]').click();
      cy.wait(2000);
      cy.get('[data-test-editor-title-input]').type('test post');
      cy.wait(2000);
      cy.get('p[data-koenig-dnd-droppable="true"]').click();
      cy.wait(2000);
      cy.contains('Publish').click();
      cy.wait(3000);
      cy.get('[data-test-button="continue"]').click();
      cy.wait(1000);
      cy.get('[data-test-button="confirm-publish"]').click();
      cy.wait(2000);
      cy.get('.gh-back-to-editor').click();
      cy.wait(2000);
      cy.get('[data-test-nav="posts"]').click();
      cy.wait(2000);
      cy.get('.gh-content-entry-title').should('contain', 'test post');
    });
  });