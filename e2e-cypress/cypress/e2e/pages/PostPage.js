export class PostsPage {
    elements = {
        postsNav: () => cy.get('[data-test-nav="posts"]'),
        newPostButton: () => cy.get('[data-test-new-post-button]'),
        descriptionPost: () => cy.get('p[data-koenig-dnd-droppable="true"]'),
        titleInput: () => cy.get('[data-test-editor-title-input]'),
        publishButton: () => cy.contains('Publish'),
        continueButton: () => cy.get('[data-test-button="continue"]'),
        confirmPublishButton: () => cy.get('[data-test-button="confirm-publish"]'),
        postTitle: () => cy.get('h3.gh-content-entry-title', { timeout: 10_000 }),
        psmTrigger: () => cy.get('[data-test-psm-trigger]'),
        postVisibilitySelect: () => cy.get('select[data-test-select="post-visibility"]'),
        backToEditor: () => cy.get('.gh-back-to-editor'),
        publishedPosts: () => cy.get('[data-test-nav-custom="posts-Published"]'),
        backToPosts: () => cy.get('a[data-test-link="posts"]'),
        drafts: () => cy.get('a[data-test-nav-custom="posts-Drafts"]'),
        body: () => cy.get('body')
    }

    visit() {
        this.elements.postsNav().click();
    }

    newPost() {
        this.elements.newPostButton().click();
    }

    clickDescriptionPost() {
        this.elements.descriptionPost().click();
    }

    fillTitle(title) {
        this.elements.titleInput().type(title);
    }

    publish() {
        this.elements.publishButton().click();
        this.elements.continueButton().click();
        this.elements.confirmPublishButton().click();
    }

    verifyPost(title) {
        this.elements.postTitle().should('be.visible').contains(title)
    }

    setVisibility(visibility) {
        this.elements.psmTrigger().click();
        this.elements.postVisibilitySelect().select(visibility);
        this.elements.psmTrigger().click();
    }

    backToEditor() {
        this.elements.backToEditor().click();
    }

    visitPublished() {
        this.elements.publishedPosts().click();
    }

    backToPosts() {
        this.elements.backToPosts().click();
    }

    goToDrafts() {
        this.elements.drafts().click();
    }

    verifyPostNotInPublished(title) {
        this.elements.body().then((body) => {
            if (body.find('.gh-content-entry-title').length > 0) {
                this.elements.postTitle().should('not.contain', title);
            }
        });
    }
}
