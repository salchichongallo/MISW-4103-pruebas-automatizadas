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

    it(`POST-5.1 As a user I log in, 
    I enter the Posts section, 
    I entered 255 characters in the title, description, and naughty excerpt of a new Post,
    then verify its creation in the Posts list`, () => {
        postsPage.visit();
        postsPage.newPost();
        const titlePost = PostSchema[randomIndex].post_title_255;
        postsPage.fillTitle(titlePost);
    
        postsPage.clickDescriptionPost();
        postsPage.fillDescription(PostSchema[randomIndex].post_paragraphs);

        postsPage.clickSettings();
        postsPage.fillExcerpt(PostSchema[randomIndex].post_naughty);

        postsPage.publish();
        postsPage.backToEditor();
        postsPage.visit();
        postsPage.verifyPost255(titlePost);
    
    });
});
