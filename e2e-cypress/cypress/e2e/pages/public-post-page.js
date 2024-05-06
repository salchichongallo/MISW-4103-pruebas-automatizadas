export class PublicPostPage {
  visit(url) {
    cy.visit(url);
    cy.get('main', { timeout: 30_000 }).should('be.visible');
  }

  getTitle() {
    return cy.get('h1');
  }

  getTags() {
    return cy.get('.gh-article-tag');
  }
}
