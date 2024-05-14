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

    it(`T-10 - As a user I log in, 
    enter the Posts section, 
    create a new Members Only Post whith title and description,
    and validate your Members Only Post`, () => {
        const randomIndex = Math.floor(Math.random() * mockData.length);
        postsPage.visit();
        postsPage.newPost();
        const titlePost = mockData[randomIndex].post_title;
        postsPage.fillTitle(titlePost);
        postsPage.clickDescriptionPost();
        postsPage.fillDescription(mockData[randomIndex].post_paragraphs);
        postsPage.setVisibility('members');
        postsPage.publish();
        postsPage.backToEditor();
        postsPage.visitPublished();
        postsPage.verifyPost(titlePost);
    });
});
