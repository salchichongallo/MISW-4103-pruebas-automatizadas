import { LoginPage } from "../pages_3.42.9/Login-page";
import { DashboardPage } from "../pages_3.42.9/dashboard-page";
import { PostsPage } from "../pages_3.42.9/posts-page";

describe('Create a post', () => {
    const loginPage = new LoginPage();
    const dashboardPage = new DashboardPage();
    const postsPage = new PostsPage();

    beforeEach(() => {
        loginPage.visit();
        loginPage.fillEmail(Cypress.env('email'));
        loginPage.fillPassword(Cypress.env('password'));
        loginPage.submit();
    });

    it('T-9 As a user I log in, enter the Posts section, create a new Post and verify its creation in the Posts list', () => {
        dashboardPage.clickPostsLinkByHref()
        postsPage.clickNewPostButtonByText();
        postsPage.typeTitle('test post');
        postsPage.clickDescription();
        postsPage.clickPublishButton();
        postsPage.clickPostsLink();
        postsPage.verifyPost('test post');
    });

});