import PostSchema from '../../../utils/post_schema.json';

import { PostsPage } from './pages/PostPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/dashboard-page';

describe('Create a post', () => {
    const loginPage = new LoginPage();
    const postsPage = new PostsPage();
    const dashboardPage = new DashboardPage();
    const randomIndex = Math.floor(Math.random() * PostSchema.length);

    beforeEach(() => {
        loginPage.visit();
        loginPage.fillEmail(Cypress.env('email'));
        loginPage.fillPassword(Cypress.env('password'));
        loginPage.submit();
        dashboardPage.waitFor();
    });

    it(`POST-9.1 As a user I log in, 
    I enter the Posts section, 
    I entered a title whit a 255 characters,
    I click in the description post
    I fill the description whit a random naughty content
    I click in the settings button
    I fill the slug whit a random slug
    I fill the publish date whit a random number
    I click in the publish button
    then It should not be published and show an error message -Invalid date format, must be YYYY-MM-DD -
    
    Issue: Error message expected, but allows publication`, () => {
        postsPage.visit();
        postsPage.newPost();
        const titlePost = PostSchema[randomIndex].post_title_255;
        postsPage.fillTitle(titlePost);
        postsPage.clickDescriptionPost();
        postsPage.fillDescription(PostSchema[randomIndex].post_naughty);
        postsPage.clickSettings();
        postsPage.fillSlug(PostSchema[randomIndex].post_slug);
        postsPage.fillPublishDate(PostSchema[randomIndex].post_naughty);
        postsPage.publish();
    });
});
