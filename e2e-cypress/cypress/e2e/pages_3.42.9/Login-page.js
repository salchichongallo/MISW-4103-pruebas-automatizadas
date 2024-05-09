export class LoginPage {
    elements = {
        url: () => cy.visit('/ghost'),
        emailInput: () => cy.get('input[name="identification"]'),
        passwordInput: () => cy.get('input[name="password"]'),
        submitButton: () => cy.contains('Sign in'),
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
    }
}