import { faker } from '@faker-js/faker';

import { LoginPage } from './pages/LoginPage';
import { TagsPage } from './pages/tags-page';
import { DashboardPage } from './pages/dashboard-page';

describe('T2 - Creación de tag con caracteres especiales', () => {
  it(`
    Given The login page
        And I sign-in with "<email>" and "<password>"
        And I wait for the dashboard
        And I navigate to tags page
        And I select create New Tag
    When I create the tag name <TAG>
        And I create the tag description <TAG>
        And I click on the save Tag
    Then I navigate to tags page
        And I should see the tag <TAG>
  `, () => {

    const loginPage = new LoginPage();
    const dashboardPage = new DashboardPage();
    const tagsPage = new TagsPage();

    // Given The login page
    loginPage.visit();
    cy.step('The login page');

    // And I sign-in with "<email>" and "<password>"
    loginPage.fillEmail(Cypress.env('email'));
    loginPage.fillPassword(Cypress.env('password'));
    loginPage.submit();
    cy.step('I sign-in with "<email>" and "<password>"');

    // And I wait for the dashboard
    dashboardPage.waitFor();
    cy.step('I wait for the dashboard');

    // And I navigate to tags page
    tagsPage.visit();
    cy.step('I navigate to tags page');

    // And I select create New Tag
    const tagForm = tagsPage.newTag();
    cy.step('I select create New Tag');

    // When I create the tag name <TAG>
    const specialString = generateSpecialString();
    tagForm.setName(specialString);
    cy.step('I create the tag name <TAG>');

    // And I create the tag description "<DESCRIPTION>"
    tagForm.setDescription(faker.lorem.sentence());
    cy.step('I create the tag description "<DESCRIPTION>"');

    // And I click on the save Tag
    tagForm.clickSave();
    cy.step('I click on the save Tag');

    // Then I navigate to tags page
    tagsPage.visit();
    cy.step('I navigate to tags page');

    // And I should see the tag <TAG>
    tagsPage.tagLists().should('include.text', specialString);
    cy.step('I should see the tag <TAG>');
  });
});

function generateSpecialString() {
    const specialChars = "!@#$%^&*()";
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const combined = letters + specialChars;

    let result = '';
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * combined.length);
        result += combined[randomIndex];
    }

    return result;
}

