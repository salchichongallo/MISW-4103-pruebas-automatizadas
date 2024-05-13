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
    I fill the slug whit a emoji
    I click in the publish button
    then It should not be published and show an error message -Invalid slug-
    
    Issue: Error message expected, but allows publication`, () => {
        postsPage.visit();
        postsPage.newPost();
        const titlePost = faker.word.words({ count: 1 });
        postsPage.fillTitle(titlePost);
        postsPage.clickDescriptionPost();
        postsPage.clickSettings();
        postsPage.clearSlug();
        postsPage.fillSlug(faker.internet.emoji());
        postsPage.publish();
    });
});
