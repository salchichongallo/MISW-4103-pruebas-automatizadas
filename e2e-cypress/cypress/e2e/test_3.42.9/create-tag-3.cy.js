import { faker } from '@faker-js/faker';

import { LoginPage } from "../pages_3.42.9/Login-page";
import { DashboardPage } from "../pages_3.42.9/dashboard-page";
import { TagPage } from "../pages_3.42.9/tag-page";

describe('T3 - Creación de tag con nombre mayor a 191 caracteres', () => {
    const loginPage = new LoginPage();
    const dashboardPage = new DashboardPage();
    const tagPages = new TagPage();

    it(`
    Given The login page
        And I sign-in with "<email>" and "<password>"
        And I wait for the dashboard
        And I navigate to tags page
        And I select create New Tag
    When I attempt to create a tag with a name of 200 characters
        And I create the tag description <DESCRIPTION>
        And I click on the save Tag
    Then I should see an error message saying "Tag names cannot be longer than 191 characters."

  `, () => {
        loginPage.visit();
        cy.step('The login page');

        loginPage.fillEmail(Cypress.env('email'));
        loginPage.fillPassword(Cypress.env('password'));
        loginPage.submit();
        cy.step('I sign-in with "<email>" and "<password>"');

        dashboardPage.waitFor();
        cy.step('I wait for the dashboard');

        dashboardPage.clickTagsLinkByHref();
        cy.step('I navigate to tags page');

        tagPages.clickNewTagButtonByText();
        cy.step('I select create New Tag');

        let longString = 'a'.repeat(201);
        tagPages.fillTagName(longString);
        cy.step('I attempt to create a tag with a name of 200 characters');

        tagPages.fillTagDescription(faker.lorem.sentence());
        cy.step('I create the tag description <DESCRIPTION>');

        tagPages.clickSaveButton();
        cy.step('I click on the save Tag');

        cy.get('.error .response:first')
            .invoke('text')
            .then(text => {
                expect(text.trim()).to.equal('Tag names cannot be longer than 191 characters.');
                cy.step('I should see an error message saying "Tag names cannot be longer than 191 characters."');
      });

    });

});
