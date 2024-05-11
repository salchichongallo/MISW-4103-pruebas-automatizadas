import { PostsPage } from './pages/PostPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/dashboard-page';

describe('Create a post', () => {
    const loginPage = new LoginPage();
    const postsPage = new PostsPage();
    const dashboardPage = new DashboardPage();

    beforeEach(() => {
        loginPage.visit();
        cy.step('The login page');
        loginPage.fillEmail(Cypress.env('email'));
        loginPage.fillPassword(Cypress.env('password'));
        cy.step('I sign-in with "<email>" and "<password>"');
        loginPage.submit();
        dashboardPage.waitFor();
        cy.step('I wait for the dashboard');
    });

    it('T-10 - As a user I log in, enter the Posts section, create a new Members Only Post and validate your Members Only Post', () => {
        postsPage.visit();
        cy.step('I navigate to post page');
        postsPage.newPost();
        postsPage.fillTitle('Members only');
        cy.step('I type the title');
        postsPage.setVisibility('members');
        cy.step('I set the visibility to members only');
        postsPage.publish();
        cy.step('I publish the post');
        postsPage.backToEditor();
        postsPage.visitPublished();
        cy.step('I navigate to posts published page');
        postsPage.verifyPost('Members only');
        cy.step('the post is created and only visible to members');
    });
});
