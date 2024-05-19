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

    it(`POST-4.2 - As a user I log in, 
    enter the Posts section, 
    create a new Post whith title and expert whith 300 caracters, without publishing it 
    and it should not appear on the published page`, () => {
        postsPage.visit();
        //cy.step('I navigate to post page');

        const titlePost = mockData.post_title;
        postsPage.newPost();
        postsPage.fillTitle(titlePost);
        postsPage.clickSettings();
        postsPage.fillExcerpt(mockData.post_excerpt_300);
        //cy.step('I type the title');

        postsPage.backToPosts();
        postsPage.visitPublished();
        //cy.step('I navigate to published posts page');

        postsPage.verifyPostNotInPublished(titlePost);
        //cy.step('the post is not listed in the published posts page');
    });
});
