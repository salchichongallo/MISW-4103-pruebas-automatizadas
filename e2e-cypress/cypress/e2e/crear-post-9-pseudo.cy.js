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

    it(`POST-9.2 As a user I log in, 
    I enter the Posts section, 
    I entered a title
    I click in the description post
    I fill the description whit a random paragraph
    I click in the settings button
    I fill the slug whit a random slug
    I fill the publish date whit a random number
    I fill the excerpt whit a 300 characters
    I click in the publish button
    then It should not be published and show an error message -Invalid date format, must be YYYY-MM-DD -
    
    Issue: Error message expected, but allows publication`, () => {
        postsPage.visit();
        postsPage.newPost();
        const titlePost = mockData.post_title;
        postsPage.fillTitle(titlePost);
        postsPage.clickDescriptionPost();
        postsPage.fillDescription(mockData.post_paragraphs);
        postsPage.clickSettings();
        postsPage.fillExcerpt(mockData.post_excerpt_300);
        postsPage.fillSlug(mockData.post_slug);
        postsPage.fillPublishDate(mockData.post_naughty);
        postsPage.publish();
    });
});
