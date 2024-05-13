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
    I entered a title
    I click in the description post
    I click in the settings button
    I entered a excerpt with more than 300 characters
    I click in the publish button
    then waited for an error message -Excerpt cannot be longer than 300 characters-`, () => {
        postsPage.visit();
        postsPage.newPost();
        postsPage.fillTitle(faker.word.words({ count: 1 }));
        postsPage.clickDescriptionPost();

        postsPage.clickSettings();
        postsPage.fillExcerpt(faker.string.alpha(301));
        postsPage.publishButtonOnly();
        postsPage.verifyErrorMessage('Excerpt cannot be longer than 300 characters.')
    
    });
});
