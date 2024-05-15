import { PostsPage } from './pages/PostPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/dashboard-page';

describe('Create a post', () => {
    const loginPage = new LoginPage();
    const postsPage = new PostsPage();
    const dashboardPage = new DashboardPage();
    let mockData;

    beforeEach(() => {
        cy.request('https://my.api.mockaroo.com/post_schema.json?key=69ae4b80').then((response) => {
        mockData = response.body;
        });

        loginPage.visit();
        loginPage.fillEmail(Cypress.env('email'));
        loginPage.fillPassword(Cypress.env('password'));
        loginPage.submit();
        dashboardPage.waitFor();
    });

    it(`POST-10.2 As a user I log in, 
    I enter the Posts section, 
    I click in the description post
    I fill the description whit a random naughty
    I click in the settings button
    I fill exerpt whit a 300 characters
    I fill the slug whit a emoji
    I click in the publish button
    then It should not be published and show an error message -Invalid slug-
    
    Issue: Error message expected, but allows publication`, () => {
        postsPage.visit();
        postsPage.newPost();
        postsPage.clickDescriptionPost();
        postsPage.fillDescription(mockData.post_naughty);
        postsPage.clickSettings();
        postsPage.fillExcerpt(mockData.post_excerpt_300);
        postsPage.clearSlug();
        postsPage.fillSlug(mockData.post_naughty);
        postsPage.publish();
    });
});
