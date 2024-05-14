import { PostsPage } from './pages/PostPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/dashboard-page';

describe('CREAPOST3 - Create a postCreate a post', () => {
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

    it(`T11 - As a user, I log in, 
    enter the Posts section, 
    create a new Post, without publishing it whith title and description and excerpt,
    and it must appear in the drafts list to be published later`, () => {
        const randomIndex = Math.floor(Math.random() * mockData.length);

        postsPage.visit();
        //cy.step('I navigate to post page');

        const titlePost = mockData[randomIndex].post_title;
        postsPage.newPost();
        postsPage.fillTitle(titlePost);
        postsPage.clickDescriptionPost();
        postsPage.fillDescription(mockData[randomIndex].post_paragraphs);
        postsPage.clickSettings();
        postsPage.fillExcerpt(mockData[randomIndex].post_excerpt);
        //cy.step('I type the title');

        postsPage.backToPosts();
        postsPage.goToDrafts();
        //cy.step('I navigate to draft posts page');

        postsPage.verifyPost(titlePost);
        //cy.step('the post is created and listed in the draft posts page');
    });
});
