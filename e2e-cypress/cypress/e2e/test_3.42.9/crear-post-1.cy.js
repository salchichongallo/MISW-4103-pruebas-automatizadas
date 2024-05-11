import { LoginPage } from "../pages_3.42.9/Login-page";
import { DashboardPage } from "../pages_3.42.9/dashboard-page";
import { PostsPage } from "../pages_3.42.9/posts-page";

describe('CREAPOST1 - Create a post', () => {
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

    it('T-9 As a user I log in, enter the Posts section, create a new Post and verify its creation in the Posts list', () => {
        dashboardPage.clickPostsLinkByHref();
        cy.step('I wait for the dashboard');
        postsPage.clickNewPostButtonByText();
        cy.step('I navigate to post page');
        postsPage.typeTitle('test post');
        cy.step('I type the title');
        postsPage.clickDescription();
        postsPage.clickPublishButton();
        cy.step('I publish the post');
        postsPage.clickPostsLink();
        cy.step('I navigate to posts page');
        postsPage.verifyPost('test post');
        cy.step('the post is created and listed in the posts page');
    });

});
