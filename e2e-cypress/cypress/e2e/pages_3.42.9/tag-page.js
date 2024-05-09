export class TagPage {

    elements = {
        newTagButtonByText: () => cy.contains('a', 'New tag'),
        tagNameInput: () => cy.get('input#tag-name'),
        slugInput: () => cy.get('input#tag-slug'), 
        tagDescriptionTextarea: () => cy.get('textarea#tag-description'),
        saveButton: () => cy.contains('button', 'Save'),
        tagTitle: () => cy.get('h3.gh-tag-list-name', { timeout: 10_000 }),
    }

    visit(){
        cy.visit('/ghost/#/tags');
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
    }

    verifyTag(title) {
        this.elements.tagTitle().should('be.visible').contains(title);
    }

    fillTagSlug(input) {
        this.elements.slugInput().type(input);
    }
}