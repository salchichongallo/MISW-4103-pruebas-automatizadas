export class MembersPage {
  visit() {
    cy.visit('/ghost/#/members');
    cy.get('.gh-canvas-title')
      .should('be.visible')
      .contains('Members');
  }

  newMember() {
    cy.get('[data-test-new-member-button="true"]').click();
  }

  verifyMember(name, email) {
    cy.get('.gh-members-list-row')
      .should('contain', name)
      .and('contain', email);
  }
}

export class MemberForm {
  setName(name) {
    cy.get('#member-name').type(name, { force: true });
  }

  clickActions() {
    cy.get('[data-test-button="member-actions"]').click();
  }

  clickImpersonate() {
    cy.get('[data-test-button="impersonate"]').click();
  }

  setEmail(email) {
    cy.get('#member-email').type(email);
  }

  clickSave() {
    cy.get('[data-test-button="save"]').click();
    cy.wait(2000);
  }
}

export class MemberAccountModal {
  open() {
    cy.get('[data-testid="portal-trigger-frame"]').click();
    cy.get('[data-portal="account"]').click();
    cy.get('[data-testid="portal-popup-frame"]').within(() => {
      cy.get('.account-home [data-test-button="edit-profile"]').click();
    });
  }

  verifyMember(name, email) {
    cy.get('.account-home .gh-portal-list-detail h3').should('contain', name);
    cy.get('.account-home .gh-portal-list-detail p').should('contain', email);
  }
}
