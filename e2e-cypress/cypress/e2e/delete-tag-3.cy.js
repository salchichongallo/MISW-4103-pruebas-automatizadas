import { faker } from '@faker-js/faker';

import { LoginPage } from './pages/LoginPage';
import { TagsPage } from './pages/tags-page';
import { DashboardPage } from './pages/dashboard-page';
import { TagPublicPage } from './pages/tag-public-page';
import { WebpagesPage } from './pages/webpages-page';

describe('DELTAG3 - Tag is no longer listed in a page', () => {
  it(`
    Given The login page
      And I sign-in with "<email>" and "<password>"
      And I wait for the dashboard
      And I navigate to tags page
      And I create the tag <TAG>
      And I navigate to webpages page
      And I create a webpage <WEBPAGE> with tag <TAG>
      And I go back to dashboard
    When I navigate to tags page
      And I select the <TAG> tag
      And I delete the tag
    Then I should not see the tag <TAG>
      And the public page tag <TAG> should not exist
      And the tags of the webpage <WEBPAGE> should not include <TAG>
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
    tagForm.getSlug().as('slug', { type: 'static' });
    tagForm.clickSave();

    const webpagesPage = new WebpagesPage();
    webpagesPage.visit();
    const form = webpagesPage.newPage();
    const pageTitle = faker.word.words({ count: 1 });
    form.setTitle(pageTitle);
    form.addTag(tagName);
    form.closeMenu();
    form.publish();

    tagsPage.visit();
    tagsPage.click(tagName);

    tagForm.clickDelete();
    tagForm.confirmDeletion();

    tagsPage.tagLists().should('not.include.text', tagName);

    cy.get('@slug').then(slug => {
      const tagPublicPage = new TagPublicPage();
      tagPublicPage.visit(slug.val());
      tagPublicPage.getTitle().should('have.text', '404');
    });

    webpagesPage.visit();
    const page = webpagesPage.select(pageTitle);
    page.getCurrentTags().should('not.exist');
  });
});
