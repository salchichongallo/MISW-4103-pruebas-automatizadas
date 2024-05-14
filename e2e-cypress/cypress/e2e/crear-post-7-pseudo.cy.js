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

    it(`T-X1 As a user I log in, 
    I enter the Posts section, 
    I entered a title
    I click in the description post
    I entered a description
    I click in the settings button
    I entered a excerpt with more than 300 characters
    I click in the publish button
    then waited for an error message -Excerpt cannot be longer than 300 characters-`, () => {
        const randomIndex = Math.floor(Math.random() * mockData.length);
        postsPage.visit();
        postsPage.newPost();
        postsPage.fillTitle(mockData[randomIndex].post_title);
        postsPage.clickDescriptionPost();
        postsPage.fillDescription(mockData[randomIndex].post_paragraphs);

        postsPage.clickSettings();
        postsPage.fillExcerpt(mockData[randomIndex].post_excerpt_301);
        postsPage.publishButtonOnly();
        postsPage.verifyErrorMessage('Excerpt cannot be longer than 300 characters.')
    
    });
});
