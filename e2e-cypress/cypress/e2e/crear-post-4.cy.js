import { PostsPage } from './pages/PostPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/dashboard-page';

describe('Create a post', () => {
    const loginPage = new LoginPage();
    const postsPage = new PostsPage();
    const dashboardPage = new DashboardPage();

    beforeEach(() => {
        loginPage.visit();
        loginPage.fillEmail(Cypress.env('email'));
        loginPage.fillPassword(Cypress.env('password'));
        loginPage.submit();
        dashboardPage.waitFor();
    });

    it('T12 - As a user I log in, enter the Posts section, create a new Post, without publishing it and it should not appear on the published page', () => {
        postsPage.visit();
        postsPage.newPost();
        postsPage.fillTitle('Unpublished');
        postsPage.backToPosts();
        postsPage.visitPublished();
        postsPage.verifyPostNotInPublished('Unpublished');
    });
});
