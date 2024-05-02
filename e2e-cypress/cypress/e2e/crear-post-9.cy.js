describe('Crear un Post', () => {
    beforeEach(() => {
      cy.visit('http://localhost:2368/ghost');
      cy.get('#identification').type(Cypress.env('emailalejandro'));
      cy.wait(1000);
      cy.get('#password').type(Cypress.env('passwordalejandro'));
      cy.wait(1000);
      cy.get('[data-test-button="sign-in"]').click();
      cy.wait(2000);
    });
  
    it('Crea un nuevo Post y verifica su creación en el listado de Posts', () => {
      cy.get('[data-test-nav="posts"]').click();
      cy.wait(2000);
      cy.get('[data-test-new-post-button]').click();
      cy.wait(2000);
      cy.get('[data-test-editor-title-input]').type('Post de prueba');
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
      cy.get('.gh-content-entry-title').should('contain', 'Post de prueba');
    });
  });