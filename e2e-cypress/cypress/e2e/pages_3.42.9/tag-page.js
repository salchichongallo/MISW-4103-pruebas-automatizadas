export class TagPage {

    elements = {
        newTagButtonByText: () => cy.contains('a', 'New tag'),
        tagNameInput: () => cy.get('input#tag-name'),
        slugInput: () => cy.get('input#tag-slug'),
        tagDescriptionTextarea: () => cy.get('textarea#tag-description'),
        saveButton: () => cy.contains('button', 'Save'),
        tagTitle: () => cy.get('h3.gh-tag-list-name', { timeout: 30_000 }),
        deleteTagButton: () => cy.get('button.gh-btn.gh-btn-red.gh-btn-icon.mb15').contains('Delete tag'),
        deleteButton: () => cy.get('button.gh-btn.gh-btn-red.gh-btn-icon.ember-view').contains('Delete'),
        cancelButton: () => cy.get('button.gh-btn').contains('Cancel'),
    }

    visit(){
        cy.visit('/ghost/#/tags');
        cy.wait(2000);
    }

    clickNewTagButtonByText() {
        this.elements.newTagButtonByText().click();
    }

    fillTagName(input) {
        this.elements.tagNameInput().type(input);
    }

    fillTagDescription(input) {
        this.elements.tagDescriptionTextarea().type(input);
    }

    clickSaveButton() {
        this.elements.saveButton().click();
        cy.wait(2000);
    }

    verifyTag(title) {
        this.elements.tagTitle().should('be.visible').contains(title);
    }

    fillTagSlug(input) {
        this.elements.slugInput().type(input);
    }

    clickTagTitle(title) {
        this.elements.tagTitle().contains(title).click();
    }

    clickDeleteTagButton() {
      this.elements.deleteTagButton().click();
      cy.wait(1_000);
    }

    clickDeleteButton() {
        this.elements.deleteButton().click();
    }

    clickCancelButton() {
        this.elements.cancelButton().click();
    }

    verifyTagDoesNotExist(title) {
        this.elements.tagTitle().contains(title).should('not.exist');
    }

    visitSlug(slug) {
        cy.visit(`/tag/${slug.toLowerCase()}`, { failOnStatusCode: false });
    }

    getTitleSlugVisit() {
        return cy.get('h1');
    }
}
