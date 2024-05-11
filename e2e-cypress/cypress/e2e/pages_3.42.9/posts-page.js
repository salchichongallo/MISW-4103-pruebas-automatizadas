export class PostsPage {

    elements = {
        newPostButtonByText: () => cy.contains('a', 'New post'),
        titleInputByClass: () => cy.get('.gh-editor-title.ember-text-area.gh-input.ember-view'),
        descriptionInputByClass: () => cy.get('p[data-koenig-dnd-droppable="true"]'),
        publishButtonByText: () => cy.contains('span', 'Publish'),
        publishButtonByClass: () => cy.get('.gh-btn.gh-btn-blue.gh-publishmenu-button.gh-btn-icon.ember-view'),
        postsLinkByText: () => cy.get('svg.w3.fill-blue.mr1.nudge-right--2', {timeout: 10_000 }), 
        publishedNotification: () => cy.contains('span', 'Published'),
        postTitle: () => cy.get('h3.gh-content-entry-title', { timeout: 10_000 }),
        status: () => cy.get('span.fw4.midgrey-l2 div'),
        publishedLink: () => cy.get('a.ember-view').contains('Published'),
    }

    visit() {
        cy.visit('/ghost/#/posts');
    }

    visitPublished() {
        cy.visit('/ghost/#/posts/?filter=published');
    }

    clickNewPostButtonByText() {
        this.elements.newPostButtonByText().click();
    }

    typeTitle(title) {
        this.elements.titleInputByClass().type(title);
    }

    clickDescription() {
        this.elements.descriptionInputByClass().click({force: true});
        cy.wait(2000);
    }

    clickPublishButton() {
        this.elements.publishButtonByText().click();
        this.elements.publishButtonByClass().should('be.visible');
        this.elements.publishButtonByClass().click();
        this.elements.publishedNotification().should('be.visible');
    }

    verifyStatus(status) {
        this.elements.status().should('contain', status);
    }

    clickPostsLink() {
        this.elements.postsLinkByText().should('be.visible').click({ multiple: true });
    }

    clickPublishedLink() {
        this.elements.publishedLink().click();
    }

    verifyPost(title) {
        this.elements.postTitle().should('be.visible').contains(title)
    }

    verifyPostNotContains(title) {
        cy.get('body').should('not.contain', title);
    }

}