import { faker } from '@faker-js/faker';
import { generateSpecialString } from '../../../../utils/generate';
import { LoginPage } from "../pages_3.42.9/Login-page";
import { DashboardPage } from "../pages_3.42.9/dashboard-page";
import { TagPage } from "../pages_3.42.9/tag-page";

describe('DELTAG4 - Admins cancel deletion of tags', () => {
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
      And I go back to dashboard
    When I navigate to tags page
      And I select the <TAG> tag
      And I click on delete tag button
      And I cancel de deletion of the tag
    Then I navigate to tags page
      And I should see the tag <TAG>
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
        tagPages.clickCancelButton();
        tagPages.visit();
        tagPages.verifyTag(specialString);
    });

});