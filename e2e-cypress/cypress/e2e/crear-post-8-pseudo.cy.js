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

    it(`POST-8.2 As a user I log in, 
    I enter the Posts section, 
    I entered a naughty title
    I click in the description post
    I entered a naughty description
    I click in the settings button
    I fill the slug with a random slug
    I fill the excerpt with a random sentence
    I remove the author
    I click in the publish button
    then waited for an error message -At least one author is required-`, () => {

        postsPage.visit();
        postsPage.newPost();
        postsPage.fillTitle(mockData.post_naughty);
        postsPage.clickDescriptionPost();
        postsPage.fillDescription(mockData.post_naughty);

        postsPage.clickSettings();
        postsPage.fillSlug(mockData.post_slug);
        postsPage.fillExcerpt(mockData.post_excerpt);
        postsPage.clearAuthors();

        postsPage.publishButtonOnly();
        postsPage.verifyErrorMessage('At least one author is required.')
    
    });
});
