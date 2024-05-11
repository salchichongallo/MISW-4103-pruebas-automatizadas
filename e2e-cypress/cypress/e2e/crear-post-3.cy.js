import { PostsPage } from './pages/PostPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/dashboard-page';

describe('CREAPOST2 - Create a post', () => {
    const loginPage = new LoginPage();
    const postsPage = new PostsPage();
    const dashboardPage = new DashboardPage();

    beforeEach(() => {
        loginPage.visit();
        cy.step('The login page');
        loginPage.fillEmail(Cypress.env('email'));
        loginPage.fillPassword(Cypress.env('password'));
        loginPage.submit();
        cy.step('I sign-in with "<email>" and "<password>"');
        dashboardPage.waitFor();
        cy.step('I wait for the dashboard');
    });

    it('T11 - As a user, I log in, enter the Posts section, create a new Post, without publishing it and it must appear in the drafts list to be published later', () => {
        postsPage.visit();
        cy.step('I navigate to post page');
        postsPage.newPost();
        postsPage.fillTitle('Unpublished in draft list');
        cy.step('I type the title');
        postsPage.backToPosts();
        postsPage.goToDrafts();
        cy.step('I navigate to draft posts page');
        postsPage.verifyPost('Unpublished in draft list');
        cy.step('the post is created and listed in the draft posts page');
    });
});
