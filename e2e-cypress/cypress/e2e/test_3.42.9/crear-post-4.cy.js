import { LoginPage } from "../pages_3.42.9/Login-page";
import { DashboardPage } from "../pages_3.42.9/dashboard-page";
import { PostsPage } from "../pages_3.42.9/posts-page";

describe('CREAPOST4 - Create a post', () => {
    const loginPage = new LoginPage();
    const dashboardPage = new DashboardPage();
    const postsPage = new PostsPage();

    it('T12 - As a user I log in, enter the Posts section, create a new Post, without publishing it and it should not appear on the published page', () => {
        loginPage.visit();
        cy.step('The login page');

        loginPage.fillEmail(Cypress.env('email'));
        loginPage.fillPassword(Cypress.env('password'));
        loginPage.submit();
        cy.step('I sign-in with "<email>" and "<password>"');

        dashboardPage.waitFor();
        cy.step('I wait for the dashboard');

        dashboardPage.clickPostsLinkByHref()
        postsPage.clickNewPostButtonByText();
        cy.step('I navigate to post page');

        postsPage.typeTitle('Unpublished');
        cy.step('I type the title');

        postsPage.clickDescription();
        postsPage.visit();
        cy.step('I navigate to published posts page');

        postsPage.clickPublishedLink();
        postsPage.verifyPostNotContains('Unpublished');
        cy.step('the post is not listed in the published posts page');
    });
});
