import { faker } from '@faker-js/faker';

import { LoginPage } from './pages/LoginPage';
import { TagsPage } from './pages/tags-page';
import { DashboardPage } from './pages/dashboard-page';

describe('CREATAG2 - Creación de tag con caracteres especiales', () => {
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
    // And I sign-in with "<email>" and "<password>"
    loginPage.fillEmail(Cypress.env('email'));
    loginPage.fillPassword(Cypress.env('password'));
    loginPage.submit();
    // And I wait for the dashboard
    dashboardPage.waitFor();
    // And I navigate to tags page
    tagsPage.visit();
    // And I select create New Tag
    const tagForm = tagsPage.newTag();
    // When I create the tag name <TAG>
    const specialString = generateSpecialString();
    tagForm.setName(specialString);
    // And I create the tag description "<DESCRIPTION>"
    tagForm.setDescription(faker.lorem.sentence());
    // And I click on the save Tag
    tagForm.clickSave();
    // Then I navigate to tags page
    tagsPage.visit();
    // And I should see the tag <TAG>
    tagsPage.tagLists().should('include.text', specialString);
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

