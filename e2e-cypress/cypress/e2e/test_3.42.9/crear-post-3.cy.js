import { LoginPage } from "../pages_3.42.9/Login-page";
import { DashboardPage } from "../pages_3.42.9/dashboard-page";
import { PostsPage } from "../pages_3.42.9/posts-page";

describe('Create a post', () => {
    const loginPage = new LoginPage();
    const dashboardPage = new DashboardPage();
    const postsPage = new PostsPage();

    beforeEach(() => {
        loginPage.visit();
        cy.step('The login page');
        loginPage.fillEmail(Cypress.env('email'));
        loginPage.fillPassword(Cypress.env('password'));
        loginPage.submit();
        cy.step('I sign-in with "<email>" and "<password>"');
    });

    it('T11 - As a user, I log in, enter the Posts section, create a new Post, without publishing it and it must appear in the drafts list to be published later', () => {
        dashboardPage.clickPostsLinkByHref();
        cy.step('I wait for the dashboard');
        postsPage.clickNewPostButtonByText();
        cy.step('I navigate to post page');
        postsPage.typeTitle('Unpublished in draft list');
        cy.step('I type the title');
        postsPage.clickDescription();
        postsPage.visit();
        cy.step('I navigate to draft posts page');
        postsPage.verifyPost('Unpublished in draft list');
        cy.step('the post is created and listed in the draft posts page');
    });

});