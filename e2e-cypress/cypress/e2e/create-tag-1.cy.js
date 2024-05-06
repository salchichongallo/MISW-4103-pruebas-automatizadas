import { faker } from '@faker-js/faker';

import { LoginPage } from './pages/LoginPage';
import { TagsPage } from './pages/tags-page';
import { DashboardPage } from './pages/dashboard-page';

describe('CREATAG1 - Creación de tag con nombre vacío', () => {
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
    // And I sign-in with "<email>" and "<password>"
    loginPage.fillEmail(Cypress.env('email'));
    loginPage.fillPassword(Cypress.env('password'));
    loginPage.submit();
    // And I wait for the dashboard
    dashboardPage.waitFor();
    // And I navigate to tags page
    tagsPage.visit();
    // And I select create New Tag
    const tagForm = tagsPage.newTag();
    // When I create the tag name "     "
    tagForm.setName('   ');
    // And I create slug Tag "SLUG"
    tagForm.setSlug(faker.lorem.slug());
    // And I create the tag description "<DESCRIPTION>"
    tagForm.setDescription(faker.lorem.sentence());
    // And I click on the save Tag
    tagForm.clickSave();
    // Then I should see an error message saying "You must specify a name for the tag."
    cy.get('.error .response:first')
      .invoke('text')
      .then(text => {
        expect(text.trim()).to.equal('You must specify a name for the tag.');
      });
  });
});
