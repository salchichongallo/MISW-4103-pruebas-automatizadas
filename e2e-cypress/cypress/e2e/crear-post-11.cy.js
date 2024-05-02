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
  
    it('Crea un nuevo Post con opcion de solo miembros', () => {
      cy.get('[data-test-nav="posts"]').click();
      cy.wait(2000);
      cy.get('[data-test-new-post-button]').click();
      cy.wait(2000);
      cy.get('[data-test-editor-title-input]').type('Members only');
      cy.wait(2000);
      cy.get('[data-test-psm-trigger]').click();
      cy.wait(1000);
      cy.get('select[data-test-select="post-visibility"]').select('members');
      cy.wait(1000);
      cy.get('[data-test-psm-trigger]').click();
      cy.wait(1000);
      cy.get('p[data-koenig-dnd-droppable="true"]').click();
      cy.wait(2000);
      cy.contains('Publish').click();
      cy.wait(2000);
      cy.get('[data-test-button="continue"]').click();
      cy.wait(1000);
      cy.get('[data-test-button="confirm-publish"]').click();
      cy.wait(2000);
      cy.get('.gh-back-to-editor').click();
      cy.wait(2000);
      cy.get('[data-test-nav="posts"]').click();
      cy.wait(2000);
      cy.contains('Members only').click();
      cy.wait(2000);
      cy.get('[data-test-psm-trigger]').click();
      cy.wait(2000);
      cy.get('a.view-post').contains('Published').click();
    });
  });