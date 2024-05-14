import { PostsPage } from './pages/PostPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/dashboard-page';

describe('CREAPOST4 - Create a post', () => {
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

    it(`T12 - As a user I log in, 
    enter the Posts section, 
    create a new Post whith title and slug, without publishing it 
    and it should not appear on the published page`, () => {
        const randomIndex = Math.floor(Math.random() * mockData.length);
        postsPage.visit();
        //cy.step('I navigate to post page');

        const titlePost = mockData[randomIndex].post_title;
        postsPage.newPost();
        postsPage.fillTitle(titlePost);
        postsPage.clickSettings();
        postsPage.fillSlug(mockData[randomIndex].post_slug);
        //cy.step('I type the title');

        postsPage.backToPosts();
        postsPage.visitPublished();
        //cy.step('I navigate to published posts page');

        postsPage.verifyPostNotInPublished(titlePost);
        //cy.step('the post is not listed in the published posts page');
    });
});
