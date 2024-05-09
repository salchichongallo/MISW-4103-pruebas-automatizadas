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
    When I create the tag name "     "
        And I create slug Tag "<SLUG>"
        And I create the tag description "<DESCRIPTION>"
        And I click on the save Tag
    Then I should see an error message saying "You must specify a name for the tag."
  `, () => {
        dashboardPage.clickTagsLinkByHref();
        tagPages.clickNewTagButtonByText();
        tagPages.fillTagName('     ');
        tagPages.fillTagSlug(faker.lorem.slug());
        tagPages.fillTagDescription(faker.lorem.sentence());
        tagPages.clickSaveButton();
        cy.get('.error .response:first')
            .invoke('text')
            .then(text => {
                expect(text.trim()).to.equal('You must specify a name for the tag.');
      });

    });

});


