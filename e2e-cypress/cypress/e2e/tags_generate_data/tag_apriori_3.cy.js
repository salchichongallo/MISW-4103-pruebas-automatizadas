import tagDataMokaroo from './data_apriori_tag.json';
import { LoginPage } from '../pages/LoginPage';
import { TagsPage } from '../pages/tags-page';
import { DashboardPage } from '../pages/dashboard-page';

describe('EA3 - Creación de tag con nombre mayor a 191 caracteres', () => {
    const loginPage = new LoginPage();
    const dashboardPage = new DashboardPage();
    const tagPages = new TagsPage();

    it(`
    Given The login page
        And I sign-in with "<email>" and "<password>"
        And I wait for the dashboard
        And I navigate to tags page
        And I select create New Tag
    When I attempt to create a tag with a name of 200 characters
        And I create the tag color "<COLOR>"
        And I create slug Tag "<SLUG>"
        And I create the tag description <DESCRIPTION>
        And I click on the save Tag
    Then I should see an error message saying "Tag names cannot be longer than 191 characters."

  `, () => {

        // Usando variables de Mokaroo
        const nameTag = tagDataMokaroo[2].name_tag.repeat(40);
        const slugTag = tagDataMokaroo[2].slug;
        const descriptionTag = tagDataMokaroo[2].description;
        const colorTag = (tagDataMokaroo[2].color).replace('#', '');

     
        // Given The login page
        loginPage.visit();
        // And I sign-in with "<email>" and "<password>"
        loginPage.fillEmail(Cypress.env('email'));
        loginPage.fillPassword(Cypress.env('password'));
        loginPage.submit();
        // And I wait for the dashboard
        dashboardPage.waitFor(); 
        // And I navigate to tags page
        tagPages.visit();  
        // And I select create New Tag
        const tagForm = tagPages.newTag(); 
        // When I attempt to create a tag with a name of 200 characters
        tagForm.setName(nameTag);
        // And I create the tag color "<COLOR>"
        tagForm.setColor(colorTag);
        // And I create slug Tag "SLUG"
        tagForm.setSlug(slugTag);  
        // And I create the tag description "<DESCRIPTION>"
        tagForm.setDescription(descriptionTag); 
        // And I click on the save Tag
        tagForm.clickSave(); 
        // Then I should see an error message saying "Tag names cannot be longer than 191 characters."
        cy.get('.error .response:first')
            .invoke('text')
            .then(text => {
                expect(text.trim()).to.equal('Tag names cannot be longer than 191 characters.');
                cy.step('I should see an error message saying "Tag names cannot be longer than 191 characters."');
      });

    });

});
