import { LoginPage } from '../pages/LoginPage';
import { TagsPage } from '../pages/tags-page';
import { DashboardPage } from '../pages/dashboard-page';

describe('EA2 - Creación de tag con caracteres especiales en Name', () => {
  let mockData;
  beforeEach(() => {
    cy.request('https://my.api.mockaroo.com/users.json?key=0a47c8f0').then(
      response => {
        mockData = response.body;
      },
    );
  });

  it(`
    Given The login page
        And I sign-in with "<email>" and "<password>"
        And I wait for the dashboard
        And I navigate to tags page
        And I select create New Tag
    When I create the tag name <TAG>
        And I create the tag color "<COLOR>"
        And I create slug Tag "<SLUG>"
        And I create the tag description <TAG>
        And I click on the save Tag
    Then I navigate to tags page
        And I should see the tag <TAG>
  `, () => {
    const loginPage = new LoginPage();
    const dashboardPage = new DashboardPage();
    const tagsPage = new TagsPage();

    // Usando variables de Mockaroo
    const nameTag = mockData.name_tag + '!#$%&%/&%%&(&¨*[;MM;_[';
    const slugTag = mockData.slug;
    const descriptionTag = mockData.description;
    const colorTag = mockData.color.replace('#', '');

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
    tagForm.setName(nameTag);
    //  And I create the tag color "<COLOR>"
    tagForm.setColor(colorTag);
    // And I create slug Tag "<SLUG>"
    tagForm.setSlug(slugTag);
    // And I create the tag description "<DESCRIPTION>"
    tagForm.setDescription(descriptionTag);
    // And I click on the save Tag
    tagForm.clickSave();
    // Then I navigate to tags page
    tagsPage.visit();
    // And I should see the tag <TAG>
    tagsPage.tagLists().should('include.text', nameTag);
  });
});
