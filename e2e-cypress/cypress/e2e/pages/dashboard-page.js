export class DashboardPage {
  visit() {
    cy.visit('/ghost');
  }

  waitFor() {
    cy.get('h2.gh-canvas-title', { timeout: 30_000 }).should('be.visible');
  }
}
