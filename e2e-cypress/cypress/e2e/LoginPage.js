export class LoginPage {
    visit() {
        cy.visit('/');
    }

    fillEmail(email) {
        cy.get('#identification').type(email);
    }

    fillPassword(password) {
        cy.get('#password').type(password);
    }

    submit() {
        cy.get('[data-test-button="sign-in"]').click();
        cy.wait(2000);
    }
}