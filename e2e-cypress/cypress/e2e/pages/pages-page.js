export class PagesPage {
  visit() {
    cy.visit('/ghost/#/pages', { timeout: 30_000 });
    cy.get('.gh-canvas-title', { timeout: 30_000 })
      .should('be.visible')
      .contains('Pages');
  }

  newPage() {
    cy.get('[data-test-new-page-button]').click();
    return new PageForm();
  }

  verifyPage(title) {
    cy.get('.gh-content-entry-title').contains(title);
  }

  verifyDraftPage(title) {
    cy.get('.gh-content-entry-title').contains(title)
      .parent()
      .should('have.class', 'gh-content-status-draft');
  }
}

export class PageForm {
  setTitle(title) {
    cy.get('.gh-editor-title').type(title);
  }

  setContent(content) {
    cy.get('.kg-prose').type(content);
  }

  setImage() {
    cy.get('.gh-editor-feature-image-unsplash').click();
    cy.get('.gh-unsplash-grid a.gh-unsplash-photo', { timeout: 30_000 }).first().trigger('mouseover');
    cy.contains('a', 'Insert image').click();
  }

  openMenu() {
    cy.get('.settings-menu-toggle').click();
  }

  setAccess(accessType) {
    cy.get('.settings-menu-toggle').click();
    cy.get('[data-test-select="post-visibility"]').select(accessType).invoke('val').should('eq', accessType);
    cy.get('.settings-menu-toggle').click();
  }

  publish() {
    this.clickPublish()
    cy.wait(2000);
    this.clickFinalReview();
    cy.wait(2000);
    this.confirmPublication();
  }

  clickPublish() {
    cy.get('[data-test-button="publish-flow"]').first().click();
  }

  clickFinalReview() {
    cy.get('[data-test-button="continue"]').click();
  }

  confirmPublication() {
    cy.get('[data-test-button="confirm-publish"]').click();
    const postAnchor = cy.get('[data-test-complete-bookmark]');
    return postAnchor.invoke('attr', 'href');
  }
}
