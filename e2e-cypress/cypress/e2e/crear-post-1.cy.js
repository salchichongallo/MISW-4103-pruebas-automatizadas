import { PostsPage } from './PostPage';
import { LoginPage } from './LoginPage';

describe('Create a post', () => {
    const loginPage = new LoginPage();
    const postsPage = new PostsPage();

    beforeEach(() => {
        loginPage.visit();
        loginPage.fillEmail(Cypress.env('email'));
        loginPage.fillPassword(Cypress.env('password'));
        loginPage.submit();
    });

    it('As a user I log in, enter the Posts section, create a new Post and verify its creation in the Posts list', () => {
        postsPage.visit();
        postsPage.newPost();
        postsPage.fillTitle('test post');
        postsPage.clickDescriptionPost();
        postsPage.publish();
        postsPage.backToEditor();
        postsPage.visit();
        postsPage.verifyPost('test post');
    });
});