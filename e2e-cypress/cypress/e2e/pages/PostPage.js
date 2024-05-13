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
        backToPosts: () => cy.get('a[data-test-link="posts"]', {timeout: 10_000 } ),
        drafts: () => cy.get('a[data-test-nav-custom="posts-Drafts"]'),
        body: () => cy.get('body'),
        alertContent: () => cy.get('.gh-alert-content'),
        excerpt: () => cy.get('textarea[name="post-setting-custom-excerpt"]'),
        authorsButton: () => cy.get('.ember-power-select-multiple-remove-btn'),
        authors: () => cy.get('.ember-power-select-trigger-multiple-input'),
        buttonDescription: () => cy.get('button[aria-label="Add a card"]'),
        buttonAddImage: () => cy.get('button[data-kg-card-menu-item="Image"]'),
        buttonAddYT: () => cy.get('button[data-kg-card-menu-item="YouTube"]'),
        inputurlYT: () => cy.get('input[data-testid="embed-url"]'),
        inputPublishDate: () => cy.get('input[data-test-date-time-picker-date-input=""]'),
        inputPublishTime: () => cy.get('input[data-test-date-time-picker-time-input=""]'),
        inputSlug: () => cy.get('input[name="post-setting-slug"]'),
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

    publishButtonOnly(){
        this.elements.publishButton().click();
    }

    verifyPost(title) {
        this.elements.postTitle().should('be.visible').contains(title)
    }

    setVisibility(visibility) {
        this.elements.psmTrigger().click();
        this.elements.postVisibilitySelect().select(visibility);
        this.elements.psmTrigger().click();
    }

    clickSettings() {
        this.elements.psmTrigger().click();
    }

    backToEditor() {
        this.elements.backToEditor().click();
    }

    visitPublished() {
        this.elements.publishedPosts().click();
    }

    backToPosts() {
        this.elements.backToPosts().should('be.visible').click();
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

    verifyErrorMessage(message) {
        this.elements.alertContent().should('be.visible').contains(message);
    }

    verifyPost255(title) {
        this.elements.postTitle().contains(title);
    }

    fillExcerpt(excerpt) {
        this.elements.excerpt().type(excerpt);
    }

    clearAuthors() {
        this.elements.authorsButton().click();
    }

    fillAuthors(author) {
        this.elements.authors().type(author);
    }

    clickAddDescription() {
        this.elements.buttonDescription().click();
    }

    clickAddImage() {
        this.elements.buttonAddImage().click();
    }

    clickAddYT() {
        this.elements.buttonAddYT().click();
    }

    fillYT(url) {
        this.elements.inputurlYT().type(url);
        this.elements.inputurlYT().type('{enter}');
        cy.wait(3000);
    }

    fillDescription(description) {
        this.elements.descriptionPost().type(description);
    }

    fillPublishDate(date) {
        this.elements.inputPublishDate().type(date);
    }

    fillSlug(slug) {
        this.elements.inputSlug().type(slug, {force: true});
    }

    clearSlug() {
        this.elements.inputSlug().clear();
    }
}
