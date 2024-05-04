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

    it('As a user I log in, enter the Posts section, create a new Post, without publishing it and it should not appear on the published page', () => {
        postsPage.visit();
        postsPage.newPost();
        postsPage.fillTitle('Unpublished');
        postsPage.backToPosts();
        postsPage.visitPublished();
        postsPage.verifyPostNotInPublished('Unpublished');
    });
});