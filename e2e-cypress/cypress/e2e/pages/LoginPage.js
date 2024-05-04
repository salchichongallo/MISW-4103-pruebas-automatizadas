export class LoginPage {
    elements = {
        url: () => cy.visit('/'),
        emailInput: () => cy.get('#identification'),
        passwordInput: () => cy.get('#password'),
        submitButton: () => cy.get('[data-test-button="sign-in"]')
    }

    visit() {
        this.elements.url();
    }

    fillEmail(email) {
        this.elements.emailInput().type(email);
    }

    fillPassword(password) {
        this.elements.passwordInput().type(password);
    }

    submit() {
        this.elements.submitButton().click();
        cy.wait(2000);
    }
}