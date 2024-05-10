import { faker } from '@faker-js/faker';

import { LoginPage } from './pages/LoginPage';
import { TagsPage } from './pages/tags-page';
import { DashboardPage } from './pages/dashboard-page';

describe('T1 - Creación de tag con nombre vacío', () => {
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
    const loginPage = new LoginPage();
    const dashboardPage = new DashboardPage();
    const tagsPage = new TagsPage();

    // Given The login page
    loginPage.visit();
    cy.step('The login page');

    // And I sign-in with "<email>" and "<password>"
    loginPage.fillEmail(Cypress.env('email'));
    loginPage.fillPassword(Cypress.env('password'));
    loginPage.submit();
    cy.step('I sign-in with "<email>" and "<password>"');

    // And I wait for the dashboard
    dashboardPage.waitFor();
    cy.step('I wait for the dashboard');

    // And I navigate to tags page
    tagsPage.visit();
    cy.step('I navigate to tags page');

    // And I select create New Tag
    const tagForm = tagsPage.newTag();
    cy.step('I select create New Tag');

    // When I create the tag name "     "
    tagForm.setName('   ');
    cy.step('I create the tag name "     "');

    // And I create slug Tag "SLUG"
    tagForm.setSlug(faker.lorem.slug());
    cy.step('I create slug Tag "SLUG"');

    // And I create the tag description "<DESCRIPTION>"
    tagForm.setDescription(faker.lorem.sentence());
    cy.step('I create the tag description "<DESCRIPTION>"');

    // And I click on the save Tag
    tagForm.clickSave();
    cy.step('I click on the save Tag');

    // Then I should see an error message saying "You must specify a name for the tag."
    cy.get('.error .response:first')
      .invoke('text')
      .then(text => {
        cy.step('I should see an error message saying "You must specify a name for the tag."');
        expect(text.trim()).to.equal('You must specify a name for the tag.');
      });
  });
});
