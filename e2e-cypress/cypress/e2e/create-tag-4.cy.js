import { faker } from '@faker-js/faker';

import { LoginPage } from './pages/LoginPage';
import { TagsPage } from './pages/tags-page';
import { DashboardPage } from './pages/dashboard-page';

describe('T4 - Creación de tag con nombre vacío', () => {
  it(`
    Given The login page
        And I sign-in with "<email>" and "<password>"
        And I wait for the dashboard
        And I navigate to tags page
        And I select create New Tag
    When I create the tag name <TAG>
        And I create slug Tag <SLUG_TAG>
        And I create the tag description <DESCRIPTION>
        And I create the tag color "GHI789"
        And I click on the save Tag
    Then I should see a color error message saying "The colour should be in valid hex format"
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
    // When I create the tag name <TAG>
    tagForm.setName(faker.person.firstName());
    // And I create slug Tag <SLUG_TAG>
    tagForm.setSlug(faker.lorem.slug());
    // And I create the tag description "<DESCRIPTION>"
    tagForm.setDescription(faker.lorem.sentence());
    // And I create the tag color "GHI789"
    tagForm.setColor('GHI789');
    // And I click on the save Tag
    tagForm.clickSave();
    // Then I should see a color error message saying "The colour should be in valid hex format"
    cy.get('.error .response[data-test-error="accentColor"]').invoke('text').then((actualErrorMessage) => {
        const expectedErrorMessage = 'The colour should be in valid hex format';
        expect(actualErrorMessage.trim()).to.equal(expectedErrorMessage);
    });
  });
});