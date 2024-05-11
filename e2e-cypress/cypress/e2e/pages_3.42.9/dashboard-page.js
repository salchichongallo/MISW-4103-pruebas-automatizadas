export class DashboardPage {

    elements = {
        siteTitle: () => cy.get('h1.site-title'),
        siteDescription: () => cy.get('h2.site-description'),
        siteHomeHeader: () => cy.get('header.site-home-header'),
        postsLinkByHref: () => cy.get('a[href="#/posts/"]'),
        draftsLinkByHref: () => cy.get('a[href="#/posts/?type=draft"]'),
        pagesLinkByHref: () => cy.get('a[href="#/pages/"]'),
        tagsLinkByHref: () => cy.get('a[href="#/tags/"]')
    }

    visit() {
        cy.visit('/ghost/#/site');
    }

    waitFor() {
        cy.get('#site-frame', { timeout: 60_000 }).should('be.visible');
        cy.wait(5_000)
    }

    waitForDescription() {
        this.elements.siteDescription().should('be.visible', { timeout: 30_000 });
    }

    waitForHeader() {
        this.elements.siteHomeHeader().should('be.visible', { timeout: 30_000 });
    }

    clickPostsLinkByHref() {
        this.elements.postsLinkByHref().click();
    }

    clickDraftsLinkByHref() {
        this.elements.draftsLinkByHref().click();
    }

    clickPagesLinkByHref() {
        this.elements.pagesLinkByHref().click();
    }

    clickTagsLinkByHref() {
        this.elements.tagsLinkByHref().click();
        cy.get('.gh-canvas-title', {timeout: 30_000})
        .should('be.visible')
        .contains('Tags');
    }
}
