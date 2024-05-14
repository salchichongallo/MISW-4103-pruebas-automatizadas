import PostSchema from '../../../utils/post_schema.json';

import { PostsPage } from './pages/PostPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/dashboard-page';

describe('CREAPOST3 - Create a postCreate a post', () => {
    const loginPage = new LoginPage();
    const postsPage = new PostsPage();
    const dashboardPage = new DashboardPage();
    const randomIndex = Math.floor(Math.random() * PostSchema.length);

    it(`T11 - As a user, I log in, 
    enter the Posts section, 
    create a new Post, without publishing it whith title and description and excerpt,
    and it must appear in the drafts list to be published later`, () => {
        loginPage.visit();
        //cy.step('The login page');

        loginPage.fillEmail(Cypress.env('email'));
        loginPage.fillPassword(Cypress.env('password'));
        loginPage.submit();
        //cy.step('I sign-in with "<email>" and "<password>"');

        dashboardPage.waitFor();
        //cy.step('I wait for the dashboard');

        postsPage.visit();
        //cy.step('I navigate to post page');

        const titlePost = PostSchema[randomIndex].post_title;
        postsPage.newPost();
        postsPage.fillTitle(titlePost);
        postsPage.clickDescriptionPost();
        postsPage.fillDescription(PostSchema[randomIndex].post_paragraphs);
        postsPage.clickSettings();
        postsPage.fillExcerpt(PostSchema[randomIndex].post_excerpt);
        //cy.step('I type the title');

        postsPage.backToPosts();
        postsPage.goToDrafts();
        //cy.step('I navigate to draft posts page');

        postsPage.verifyPost(titlePost);
        //cy.step('the post is created and listed in the draft posts page');
    });
});
