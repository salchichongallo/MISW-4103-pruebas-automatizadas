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
        dashboardPage.waitFor()
    });

    it('T-10 - As a user I log in, enter the Posts section, create a new Members Only Post and validate your Members Only Post', () => {
        postsPage.visit();
        postsPage.newPost();
        postsPage.fillTitle('Members only');
        postsPage.setVisibility('members');
        postsPage.publish();
        postsPage.backToEditor();
        postsPage.visitPublished();
        postsPage.verifyPost('Members only');
    });
});
