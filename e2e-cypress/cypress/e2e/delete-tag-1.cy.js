import { faker } from '@faker-js/faker';

import { LoginPage } from './pages/LoginPage';
import { TagsPage } from './pages/tags-page';
import { DashboardPage } from './pages/dashboard-page';
import { TagPublicPage } from './pages/tag-public-page';

describe('DELTAG1 - Tag is deleted from public page', () => {
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
    const loginPage = new LoginPage();
    const dashboardPage = new DashboardPage();
    const tagsPage = new TagsPage();
    const tagPublicPage = new TagPublicPage();

    loginPage.visit();
    loginPage.fillEmail(Cypress.env('email'));
    loginPage.fillPassword(Cypress.env('password'));
    loginPage.submit();

    dashboardPage.waitFor();

    const tagName = faker.person.firstName();
    tagsPage.visit();
    const tagForm = tagsPage.newTag();
    tagForm.setName(tagName);

    tagForm.getSlug().as('slug', { type: 'static' });

    tagForm.clickSave();

    tagsPage.visit();
    tagsPage.click(tagName);

    tagForm.clickDelete();
    tagForm.confirmDeletion();

    tagsPage.tagLists().should('not.include.text', tagName);

    cy.get('@slug').then(slug => {
      tagPublicPage.visit(slug.val());
      tagPublicPage.getTitle().should('have.text', '404');
    });
  });
});
