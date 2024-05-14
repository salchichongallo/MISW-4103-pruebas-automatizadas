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

    it(`T-X1 As a user I log in, 
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
        const titlePost = PostSchema[randomIndex].post_title_255;
        postsPage.fillTitle(titlePost);
    
        postsPage.clickDescriptionPost();
        postsPage.fillTitle(PostSchema[randomIndex].post_letter);
        postsPage.clickDescriptionPost();
        postsPage.fillDescription(PostSchema[randomIndex].post_paragraphs);

        postsPage.publishButtonOnly();
        postsPage.verifyErrorMessage('Title cannot be longer than 255 characters.')
    
    });
});
