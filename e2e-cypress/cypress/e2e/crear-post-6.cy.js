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

    it(`POST-6 As a user I log in, 
    I enter the Posts section, 
    I entered 255 characters in the title
    I click in the description post
    I entered 1 character in the title
    I click in the description post
    I entered a description
    I click in the publish button
    then waited for an error message that it cannot be more than 255 characters`, () => {
        postsPage.visit();
        postsPage.newPost();
        const titlePost = faker.string.alpha(255);
        postsPage.fillTitle(titlePost);
    
        postsPage.clickDescriptionPost();
        postsPage.fillTitle(faker.string.alpha(1));
        postsPage.clickDescriptionPost();
        postsPage.fillDescription(faker.lorem.paragraph());

        postsPage.publishButtonOnly();
        postsPage.verifyErrorMessage('Title cannot be longer than 255 characters.')
    
    });
});
