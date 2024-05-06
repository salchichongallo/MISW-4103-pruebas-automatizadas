import { TagCombobox } from './tag-combobox';

export class WebpagesPage {
  visit() {
    cy.visit('/ghost/#/pages');
    cy.reload();
    cy.get('.gh-canvas-title', { timeout: 30_000 })
      .should('be.visible')
      .contains('Pages');
  }

  newPage() {
    cy.get('[data-test-new-page-button]').click();
    return new NewWebpageForm();
  }

  select(pageTitle) {
    cy.get(`.gh-content-entry-title:contains("${pageTitle}")`).click();
    return new NewWebpageForm();
  }
}

export class NewWebpageForm {
  async setTitle(title) {
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

  closeMenu() {
    this.openMenu();
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

  getCurrentTags() {
    this.openMenu();
    const tag = new TagCombobox(this);
    return tag.getSelectedTags();
  }
}
