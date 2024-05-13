import { faker } from '@faker-js/faker';

import { LoginPage } from './pages/LoginPage';
import { TagsPage } from './pages/tags-page';
import { DashboardPage } from './pages/dashboard-page';

describe('T3 - Creación de tag con nombre mayor a 191 caracteres', () => {
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

    // When I attempt to create a tag with a name of 200 characters
    let longString = 'a'.repeat(201);
    tagForm.setName(longString);
    cy.step('I attempt to create a tag with a name of 200 characters');

    // And I create the tag description <DESCRIPTION>
    tagForm.setDescription(faker.lorem.sentence());
    cy.step('I create the tag description <DESCRIPTION>');

    // And I click on the save Tag
    tagForm.clickSave();
    cy.step('I click on the save Tag');

    // Then I should see an error message saying "Tag names cannot be longer than 191 characters."
    cy.get('.error .response:first')
      .invoke('text')
      .then(text => {
        expect(text.trim()).to.equal('Tag names cannot be longer than 191 characters.');
        cy.step('I should see an error message saying "Tag names cannot be longer than 191 characters."');
      });
  });
});
