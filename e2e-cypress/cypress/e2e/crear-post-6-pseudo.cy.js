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

    it(`POST-6.2 As a user I log in, 
    I enter the Posts section, 
    I entered 255 characters in the title
    I click in the description post
    I entered 1 character in the title
    I click in the description post
    I entered a description
    I click in the settings
    I entered a excerpt 300 characters
    I click in the publish button
    then waited for an error message that it cannot be more than 255 characters`, () => {
        postsPage.visit();
        postsPage.newPost();
        const titlePost = mockData.post_title_255;
        postsPage.fillTitle(titlePost);
    
        postsPage.clickDescriptionPost();
        postsPage.fillTitle(mockData.post_letter);
        postsPage.clickDescriptionPost();
        postsPage.fillDescription(mockData.post_paragraphs);
        postsPage.clickSettings();
        postsPage.fillExcerpt(mockData.post_excerpt_300);

        postsPage.publishButtonOnly();
        postsPage.verifyErrorMessage('Title cannot be longer than 255 characters.')
    
    });
});
