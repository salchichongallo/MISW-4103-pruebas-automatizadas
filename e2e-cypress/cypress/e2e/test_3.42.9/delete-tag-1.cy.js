import { faker } from '@faker-js/faker';
import { generateSpecialString } from '../../../../utils/generate';
import { LoginPage } from "../pages_3.42.9/Login-page";
import { DashboardPage } from "../pages_3.42.9/dashboard-page";
import { TagPage } from "../pages_3.42.9/tag-page";

describe('DELTAG1 - Tag is deleted from public page', () => {
    const loginPage = new LoginPage();
    const dashboardPage = new DashboardPage();
    const tagPages = new TagPage();

    it(`
    Given The login page
      And I sign-in with "<email>" and "<password>"
      And I wait for the dashboard
      And I navigate to tags page
      And I create the tag <TAG>
    When I navigate to tags page
      And I select the <TAG> tag
      And I delete the tag
    Then I should not see the tag <TAG>
      And the public page tag <TAG> should not exist
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
        const specialString = generateSpecialString();
        tagPages.fillTagName(specialString);
        const slug = faker.lorem.slug();
        tagPages.fillTagSlug(slug);
        tagPages.fillTagDescription(faker.lorem.sentence());
        tagPages.clickSaveButton();
        cy.step('I create the tag <TAG>');

        tagPages.visit();
        cy.step('I navigate to tags page');

        tagPages.clickTagTitle(specialString);
        cy.step('I select the <TAG> tag');

        tagPages.clickDeleteTagButton();
        tagPages.clickDeleteButton();
        cy.step('I delete the tag');

        tagPages.verifyTagDoesNotExist(specialString);
        cy.step('I should not see the tag <TAG>');

        tagPages.visitSlug(slug);
        tagPages.getTitleSlugVisit().should('have.text', '404');
        cy.step('the public page tag <TAG> should not exist');
    });

});
