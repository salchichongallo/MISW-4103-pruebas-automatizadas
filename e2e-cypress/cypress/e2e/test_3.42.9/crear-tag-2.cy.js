import { faker } from '@faker-js/faker';

import { LoginPage } from "../pages_3.42.9/Login-page";
import { DashboardPage } from "../pages_3.42.9/dashboard-page";
import { TagPage } from "../pages_3.42.9/tag-page";

describe('T2 - Creación de tag con caracteres especiales', () => {
    const loginPage = new LoginPage();
    const dashboardPage = new DashboardPage();
    const tagPages = new TagPage();

    beforeEach(() => {
        loginPage.visit();
        loginPage.fillEmail(Cypress.env('email'));
        loginPage.fillPassword(Cypress.env('password'));
        loginPage.submit();
    });

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
        dashboardPage.clickTagsLinkByHref();
        tagPages.clickNewTagButtonByText();
        const specialString = generateSpecialString();
        tagPages.fillTagName(specialString);
        tagPages.fillTagDescription(faker.lorem.sentence());
        tagPages.clickSaveButton();
        tagPages.visit();
        tagPages.verifyTag(specialString);

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