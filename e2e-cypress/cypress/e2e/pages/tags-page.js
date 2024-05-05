export class TagsPage {
  visit() {
    cy.visit('/ghost/#/tags');
    cy.reload();
    cy.get('.gh-canvas-title', { timeout: 30_000 })
      .should('be.visible')
      .contains('Tags');
  }

  newTag() {
    cy.get('.view-actions a').click().wait(1_000);
    return new TagForm();
  }

  click(tagName) {
    cy.get(`.gh-tag-list-name:contains("${tagName}")`).click();
    return new TagForm();
  }

  tagLists() {
    return cy.get('.gh-tag-list-name');
  }
}

export class TagForm {
  setName(name) {
    cy.get('#tag-name').type(name);
  }

  clickSave() {
    cy.get('[data-test-button="save"]').click();
  }

  clickDelete() {
    cy.get('[data-test-button="delete-tag"]').click();
  }

  confirmDeletion() {
    cy.get('[data-test-button="confirm"]').click();
  }

  getSlug() {
    return cy.get('#tag-slug');
  }
}
