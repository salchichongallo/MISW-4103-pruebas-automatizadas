import { TagCombobox } from './tag-combobox';

export class PostsPage {
  visit() {
    cy.visit('/ghost/#/posts');
    cy.reload();
    cy.get('.gh-canvas-title', { timeout: 30_000 })
      .should('be.visible')
      .contains('Posts');
  }

  newPost() {
    cy.get('[data-test-new-post-button]').click();
    return new PostForm();
  }
}

export class PostForm {
  setTitle(title) {
    cy.get('.gh-editor-title').type(title);
  }

  addTag(tagName) {
    this.openMenu();
    const tag = new TagCombobox();
    tag.select(tagName);
  }

  openMenu() {
    cy.get('.settings-menu-toggle').click();
  }

  publish() {
    this.clickPublish();
    this.clickFinalReview();
    return this.confirmPublication();
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
