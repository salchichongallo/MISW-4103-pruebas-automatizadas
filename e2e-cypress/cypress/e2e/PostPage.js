export class PostsPage {
    visit() {
        cy.get('[data-test-nav="posts"]').click();
    }

    newPost() {
        cy.get('[data-test-new-post-button]').click();
    }

    clickDescriptionPost() {
        cy.get('p[data-koenig-dnd-droppable="true"]').click();
    }

    fillTitle(title) {
        cy.get('[data-test-editor-title-input]').type(title);
    }

    publish() {
        cy.contains('Publish').click();
        cy.get('[data-test-button="continue"]').click();
        cy.get('[data-test-button="confirm-publish"]').click();
    }

    verifyPost(title) {
        cy.get('.gh-content-entry-title').should('contain', title);
    }

    setVisibility(visibility) {
        cy.get('[data-test-psm-trigger]').click();
        cy.wait(1000);
        cy.get('select[data-test-select="post-visibility"]').select(visibility);
        cy.get('[data-test-psm-trigger]').click();
    }

    backToEditor() {
        cy.get('.gh-back-to-editor').click();
    }

    visitPublished() {
        cy.get('[data-test-nav-custom="posts-Published"]').click();
    }

    backToPosts() {
        cy.get('a[data-test-link="posts"]').click();
    }

    goToDrafts() {
        cy.get('a[data-test-nav-custom="posts-Drafts"]').click();
    }

    verifyPostNotInPublished(title) {
        cy.get('body').then((body) => {
            if (body.find('.gh-content-entry-title').length > 0) {
                cy.get('.gh-content-entry-title').should('not.contain', title);
            }
        });
    }
}