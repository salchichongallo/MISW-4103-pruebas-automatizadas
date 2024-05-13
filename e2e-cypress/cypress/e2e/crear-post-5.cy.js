import { faker } from '@faker-js/faker';

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

    it(`T-X1 As a user I log in, 
    I enter the Posts section, 
    I entered 255 characters in the title
    then verify its creation in the Posts list`, () => {
        postsPage.visit();
        postsPage.newPost();
        const titlePost = faker.string.alpha(255);
        postsPage.fillTitle(titlePost);
    
        postsPage.clickDescriptionPost();
        postsPage.publish();
        postsPage.backToEditor();
        postsPage.visit();
        postsPage.verifyPost255(titlePost);
    
    });
});
