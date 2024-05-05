export class TagPublicPage {
  visit(slug) {
    cy.visit(`/tag/${slug.toLowerCase()}`, { failOnStatusCode: false });
    cy.get('#main', { timeout: 30_000 });
  }

  getTitle() {
    return cy.get('h1');
  }
}
