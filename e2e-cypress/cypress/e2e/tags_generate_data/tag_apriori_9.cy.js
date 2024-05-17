import tagDataMockaroo from './data_apriori_tag.json';
import { LoginPage } from '../pages/LoginPage';
import { TagsPage } from '../pages/tags-page';
import { DashboardPage } from '../pages/dashboard-page';


describe('EA9 - Creación de tag SLUG mayor a 191 caracteres', () => {
    it(`
      Given The login page
          And I sign-in with "<email>" and "<password>"
          And I wait for the dashboard
          And I navigate to tags page
          And I select create New Tag
      When I create the tag name <TAG>
          And I create slug Tag <SLUG_TAG>
          And I create the tag description <DESCRIPTION>
          And I create the tag color "<COLOR>"
          And I click on the save Tag
      Then I should see a color error message saying "URL cannot be longer than 191 characters."
    `, () => {
        const loginPage = new LoginPage();
        const dashboardPage = new DashboardPage();
        const tagsPage = new TagsPage();
  
        // Usando variables de Mockaroo
        const nameTag = tagDataMockaroo[8].name_tag;
        const slugTag = tagDataMockaroo[8].slug.repeat(11);
        const descriptionTag = tagDataMockaroo[8].description;
        const colorTag = (tagDataMockaroo[8].color).replace('#', '');
  
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
        // And I create slug Tag <SLUG_TAG>
        tagForm.setSlug(slugTag);    
        // And I create the tag description "<DESCRIPTION>"
        tagForm.setDescription(descriptionTag); 
        // And I create the tag color "GHI789"
        tagForm.setColor(colorTag);
        // And I click on the save Tag
        tagForm.clickSave();  
        // Then I should see a color error message saying "URL cannot be longer than 191 characters."
        cy.get('.response').invoke('text').then((actualErrorMessage) => {
            const expectedErrorMessage = 'URL cannot be longer than 191 characters.';
            expect(actualErrorMessage.trim()).to.equal(expectedErrorMessage);
        });
    
    });
  });
  