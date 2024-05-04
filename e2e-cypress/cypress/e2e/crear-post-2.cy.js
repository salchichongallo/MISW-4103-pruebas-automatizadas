import { PostsPage } from './pages/PostPage';
import { LoginPage } from './pages/LoginPage';

describe('Create a post', () => {
    const loginPage = new LoginPage();
    const postsPage = new PostsPage();

    beforeEach(() => {
        loginPage.visit();
        loginPage.fillEmail(Cypress.env('email'));
        loginPage.fillPassword(Cypress.env('password'));
        loginPage.submit();
    });

    it('As a user I log in, enter the Posts section, create a new Members Only Post and validate your Members Only Post', () => {
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