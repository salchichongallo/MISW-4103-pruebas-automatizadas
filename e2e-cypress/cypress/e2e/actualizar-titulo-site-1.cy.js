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

    it(`SETTINGS-3 As a user I log in, 
    I enter to general settings,
    I update the title 
    I update description of the site with 201 characters,
    Then I see an alert message that the user can't be saved.
    `, () => {
        profilePage.visit();
        profilePage.editButtonTitle();
        profilePage.fillSiteTitle(mockData.title);
        profilePage.fillSiteDescription(mockData.string_201);
        profilePage.saveButtonTitle();
        profilePage.alertMessageDescrption();
    });
});
