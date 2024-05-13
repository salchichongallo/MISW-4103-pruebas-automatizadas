import { PostsPage } from './pages/PostPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/dashboard-page';

describe('CREAPOST4 - Create a post', () => {
    const loginPage = new LoginPage();
    const postsPage = new PostsPage();
    const dashboardPage = new DashboardPage();

    it('T12 - As a user I log in, enter the Posts section, create a new Post, without publishing it and it should not appear on the published page', () => {
        loginPage.visit();
        cy.step('The login page');

        loginPage.fillEmail(Cypress.env('email'));
        loginPage.fillPassword(Cypress.env('password'));
        loginPage.submit();
        cy.step('I sign-in with "<email>" and "<password>"');

        dashboardPage.waitFor();
        cy.step('I wait for the dashboard');

        postsPage.visit();
        cy.step('I navigate to post page');

        postsPage.newPost();
        postsPage.fillTitle('Unpublished');
        cy.step('I type the title');

        postsPage.backToPosts();
        postsPage.visitPublished();
        cy.step('I navigate to published posts page');

        postsPage.verifyPostNotInPublished('Unpublished');
        cy.step('the post is not listed in the published posts page');
    });
});
