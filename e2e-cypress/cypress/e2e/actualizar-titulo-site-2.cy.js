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

    it(`SETTINGS-4 As a user I log in, 
    I enter to general settings,
    I update the title whith 151 characters,
    I update description,
    Then I see an alert message that the user can't be saved.
    `, () => {
        profilePage.visit();
        profilePage.editButtonTitle();
        profilePage.fillSiteTitle(mockData.string_151);
        profilePage.fillSiteDescription(mockData.description);
        profilePage.saveButtonTitle();
        profilePage.alertMessageTitle();
    });
});
