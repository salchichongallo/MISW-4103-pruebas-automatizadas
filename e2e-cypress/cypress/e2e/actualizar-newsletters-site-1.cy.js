import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/dashboard-page';
import { SettingsPage } from './pages/settings-page';

describe('Create a post', () => {
    const loginPage = new LoginPage();
    const dashboardPage = new DashboardPage();
    const profilePage = new SettingsPage();
    let mockData;
    
    beforeEach(() => {
        cy.request('https://my.api.mockaroo.com/settings_schema.json?key=69ae4b80').then((response) => {
        mockData = response.body;
        });
        
        loginPage.visit();
        loginPage.fillEmail(Cypress.env('email'));
        loginPage.fillPassword(Cypress.env('password'));
        loginPage.submit();
        dashboardPage.waitFor();
    });

    it(`SETTINGS-9 As a user I log in, 
    I enter to general settings,
    I click on Newsletters,
    I fill the site name with 192 characters,
    I fill the site description,
    I click on save,
    I should see an alert message that the site name exceeds the maximum length of 191 characters.
    `, () => {
        profilePage.visit();
        profilePage.addButtonNewsletters();
        profilePage.fillSiteNameNewsletters(mockData.string_192);
        profilePage.fillSiteDescriptionNewsletters(mockData.description);
        profilePage.saveButtonNewsletters();
        profilePage.alertMessageNewsletters();
    });
});
