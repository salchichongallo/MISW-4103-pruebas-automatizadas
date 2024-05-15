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

    it(`POST-5.2 As a user I log in, 
    I enter the Posts section, 
    I entered 255 characters in the title, naughty description, and naughty slug of a new Post,
    then verify its creation in the Posts list`, () => {
        postsPage.visit();
        postsPage.newPost();
        const titlePost = mockData.post_title_255;
        postsPage.fillTitle(titlePost);
    
        postsPage.clickDescriptionPost();
        postsPage.fillDescription(mockData.post_naughty);

        postsPage.clickSettings();
        postsPage.fillSlug(mockData.post_naughty);

        postsPage.publish();
        postsPage.backToEditor();
        postsPage.visit();
        postsPage.verifyPost255(titlePost);
    
    });
});
