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
  
    it('As a user, I log in, enter the Posts section, create a new Post, without publishing it and it must appear in the drafts list to be published later', () => {
      cy.get('[data-test-nav="posts"]').click();
      cy.wait(2000);
      cy.get('[data-test-new-post-button]').click();
      cy.wait(2000);
      cy.get('[data-test-editor-title-input]').type('Unpublished in draft list');
      cy.wait(2000);
      cy.get('p[data-koenig-dnd-droppable="true"]').click();
      cy.wait(2000);
      cy.get('a[data-test-link="posts"]').click();
      cy.wait(2000);
      cy.get('a[data-test-nav-custom="posts-Drafts"]').click();
      cy.wait(2000);
      cy.get('.gh-content-entry-title').should('contain', 'Unpublished in draft list');
    });
  });