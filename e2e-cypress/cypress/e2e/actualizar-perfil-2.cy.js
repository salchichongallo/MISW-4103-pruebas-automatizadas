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

    it(`SETTINGS-2 As a user I log in, 
    I enter to profile settings,
    I fill the location field with a new location,
    I fill the website field with a new website,
    I fill the X field with a new twitter account,
    I fill the bio field with a new bio with 201 caracters,
    Then I should see an alert message saying "Can't save user, please double check that you've filled all mandatory fields."
    `, () => {
        profilePage.visit();
        profilePage.clickElement();
        profilePage.fillLocation(mockData.location)
        profilePage.fillWebsite(mockData.website)
        profilePage.fillFacebook(mockData.username)
        profilePage.fillX(mockData.username)
        profilePage.fillBio(mockData.string_201)
        profilePage.saveAndClose();
        profilePage.alertMessage();

    });
});
