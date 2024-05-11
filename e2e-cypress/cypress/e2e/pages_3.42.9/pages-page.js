export class PagePage {

    elements = {
        newPageLinkByText: () => cy.contains('a', 'New page'),
        titleInputByClass: () => cy.get('textarea.gh-editor-title.ember-text-area.gh-input.ember-view'),
        droppableParagraph: () => cy.get('p[data-koenig-dnd-droppable="true"]'),
        contentInput: () => cy.get('.koenig-editor__editor.__mobiledoc-editor'),
        publishButtonByText: () => cy.contains('span', 'Publish'),
        publishButtonByClass: () => cy.get('button.gh-btn.gh-btn-blue.gh-publishmenu-button.gh-btn-icon.ember-view'),
        publishedNotification: () => cy.contains('span', 'Published'),
        pageTitle: () => cy.get('h3.gh-content-entry-title', { timeout: 10_000 }),
        allPagesElement: () => cy.get('span.ember-power-select-selected-item').contains('All pages'),
        draftPagesElement: () => cy.get('li.ember-power-select-option').contains('Draft pages')

    }

    visit() {
        cy.visit('/ghost/#/pages');
    }

    clickNewPageLinkByText() {
        this.elements.newPageLinkByText().click();
    }

    typeTitle(title) {
        this.elements.titleInputByClass().type(title);
    }

    setContent(content) {
        this.elements.droppableParagraph().click({force : true});
        this.elements.contentInput().type(content, {force : true});
    }

    clickPublishButton() {
        this.elements.publishButtonByText().click();
        this.elements.publishButtonByClass().should('be.visible').click();
        this.elements.publishButtonByClass().click();
        this.elements.publishedNotification().should('be.visible');
    }

    verifyPage(title) {
        this.elements.pageTitle().should('be.visible').contains(title);
    }

    clickAllPagesElement() {
        this.elements.allPagesElement().click();
    }

    clickDraftPagesElement() {
        this.elements.draftPagesElement().click();
    }
}