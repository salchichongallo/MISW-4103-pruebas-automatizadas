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
    I fill the description whit a random paragraph
    I click in the settings button
    I fill the slug whit a emoji
    I click in the publish button
    then It should not be published and show an error message -Invalid slug-
    
    Issue: Error message expected, but allows publication`, () => {
        const randomIndex = Math.floor(Math.random() * mockData.length);
        postsPage.visit();
        postsPage.newPost();
        const titlePost = mockData[randomIndex].post_title;
        postsPage.fillTitle(titlePost);
        postsPage.clickDescriptionPost();
        postsPage.fillDescription(mockData[randomIndex].post_paragraphs);
        postsPage.clickSettings();
        postsPage.clearSlug();
        postsPage.fillSlug(mockData[randomIndex].post_naughty);
        postsPage.publish();
    });
});
