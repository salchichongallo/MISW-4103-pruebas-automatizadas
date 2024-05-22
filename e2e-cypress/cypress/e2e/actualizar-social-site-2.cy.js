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

    it(`SETTINGS-8 As a user I log in, 
    I enter to general settings,
    I update the social site with a username data,
    I update the x site with a iban data,
    Then I see a error in X field `, () => {
        profilePage.visit();
        profilePage.editButtonSocial();
        profilePage.fillSiteSocialFacebook(mockData.username);
        profilePage.fillSiteSocialX(mockData.iban);
        profilePage.saveButtonSocial();
        profilePage.alertMessageX();
    });
});
