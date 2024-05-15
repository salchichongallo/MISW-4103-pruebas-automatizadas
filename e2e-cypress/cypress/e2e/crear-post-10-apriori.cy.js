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

    it(`POST-10.1 As a user I log in, 
    I enter the Posts section, 
    I entered a title
    I click in the description post
    I fill the description whit a random paragraph
    I click in the settings button
    I fill the slug whit a emoji
    I fill the excerpt whit only 1 character
    I click in the publish button
    then It should not be published and show an error message -Invalid slug-
    
    Issue: Error message expected, but allows publication`, () => {
        postsPage.visit();
        postsPage.newPost();
        const titlePost = PostSchema[randomIndex].post_title;
        postsPage.fillTitle(titlePost);
        postsPage.clickDescriptionPost();
        postsPage.fillDescription(PostSchema[randomIndex].post_paragraphs);
        postsPage.clickSettings();
        postsPage.clearSlug();
        postsPage.fillExcerpt(PostSchema[randomIndex].post_letter)
        postsPage.fillSlug(PostSchema[3].post_naughty);
        postsPage.publish();
    });
});
