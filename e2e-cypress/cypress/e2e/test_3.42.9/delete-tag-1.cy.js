import { faker } from '@faker-js/faker';
import { generateSpecialString } from '../../../../utils/generate';
import { LoginPage } from "../pages_3.42.9/Login-page";
import { DashboardPage } from "../pages_3.42.9/dashboard-page";
import { TagPage } from "../pages_3.42.9/tag-page";

describe('DELTAG1 - Tag is deleted from public page', () => {
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
      And I create the tag <TAG>
    When I navigate to tags page
      And I select the <TAG> tag
      And I delete the tag
    Then I should not see the tag <TAG>
      And the public page tag <TAG> should not exist
  `, () => {
        dashboardPage.clickTagsLinkByHref();
        tagPages.clickNewTagButtonByText();
        const specialString = generateSpecialString();
        tagPages.fillTagName(specialString);
        const slug = faker.lorem.slug();
        tagPages.fillTagSlug(slug);
        tagPages.fillTagDescription(faker.lorem.sentence());
        tagPages.clickSaveButton();
        tagPages.visit();
        tagPages.clickTagTitle(specialString);
        tagPages.clickDeleteTagButton();
        tagPages.clickDeleteButton();
        tagPages.verifyTagDoesNotExist(specialString);
        tagPages.visitSlug(slug);
        tagPages.getTitleSlugVisit().should('have.text', '404');
    });

});
