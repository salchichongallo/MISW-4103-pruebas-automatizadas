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
    I fill the slug with a random slug
    I fill the excerpt with a random sentence
    I remove the author
    I click in the publish button
    then waited for an error message -At least one author is required-`, () => {
        postsPage.visit();
        postsPage.newPost();
        postsPage.fillTitle(faker.word.words({ count: 1 }));
        postsPage.clickDescriptionPost();
        postsPage.fillDescription(faker.lorem.paragraph());

        postsPage.clickSettings();
        postsPage.fillSlug(faker.lorem.slug());
        postsPage.fillExcerpt(faker.lorem.sentence());
        postsPage.clearAuthors();

        postsPage.publishButtonOnly();
        postsPage.verifyErrorMessage('At least one author is required.')
    
    });
});
