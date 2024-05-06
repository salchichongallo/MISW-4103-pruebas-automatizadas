import { faker } from '@faker-js/faker';

import { LoginPage } from './pages/LoginPage';
import { TagsPage } from './pages/tags-page';
import { DashboardPage } from './pages/dashboard-page';

describe('DELTAG4 - Admins cancel deletion of tags', () => {
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
    const loginPage = new LoginPage();
    loginPage.visit();
    loginPage.fillEmail(Cypress.env('email'));
    loginPage.fillPassword(Cypress.env('password'));
    loginPage.submit();

    const dashboardPage = new DashboardPage();
    dashboardPage.waitFor();

    const tagsPage = new TagsPage();
    tagsPage.visit();
    const tagName =
      faker.person.firstName() + Math.random().toString(36).slice(2, 10);
    const tagForm = tagsPage.newTag();
    tagForm.setName(tagName);
    tagForm.getSlug();
    tagForm.clickSave();

    tagsPage.visit();
    tagsPage.click(tagName);

    tagForm.clickDelete();
    tagForm.cancelDelete();

    tagsPage.visit();

    tagsPage.tagLists().should('include.text', tagName);
  });
});
