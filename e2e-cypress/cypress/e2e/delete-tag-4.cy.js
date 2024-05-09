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
    cy.step('The login page');

    loginPage.fillEmail(Cypress.env('email'));
    loginPage.fillPassword(Cypress.env('password'));
    loginPage.submit();
    cy.step('I sign-in with "<email>" and "<password>"');

    const dashboardPage = new DashboardPage();
    dashboardPage.waitFor();
    cy.step('I wait for the dashboard');

    const tagsPage = new TagsPage();
    tagsPage.visit();
    cy.step('I navigate to tags page');

    const tagName =
      faker.person.firstName() + Math.random().toString(36).slice(2, 10);
    const tagForm = tagsPage.newTag();
    tagForm.setName(tagName);
    tagForm.getSlug();
    tagForm.clickSave();
    cy.step('I create the tag <TAG>');

    tagsPage.visit();
    cy.step('I navigate to tags page');

    tagsPage.click(tagName);
    cy.step('I select the <TAG> tag');

    tagForm.clickDelete();
    cy.step('I click on delete tag button');

    cy.step('I cancel de deletion of the tag');
    tagForm.cancelDelete();

    tagsPage.visit();
    cy.step('I navigate to tags page');

    tagsPage.tagLists().should('include.text', tagName);
    cy.step('I should see the tag <TAG>');
  });
});
