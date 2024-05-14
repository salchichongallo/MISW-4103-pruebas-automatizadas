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
        //cy.step('The login page');
        loginPage.fillEmail(Cypress.env('email'));
        loginPage.fillPassword(Cypress.env('password'));
        //cy.step('I sign-in with "<email>" and "<password>"');
        loginPage.submit();
        dashboardPage.waitFor();
        //cy.step('I wait for the dashboard');
    });

    it(`T-10 - As a user I log in, 
    enter the Posts section, 
    create a new Members Only Post whith title and description,
    and validate your Members Only Post`, () => {
        postsPage.visit();
        //cy.step('I navigate to post page');
        postsPage.newPost();
        const titlePost = PostSchema[randomIndex].post_title;
        postsPage.fillTitle(titlePost);
        postsPage.clickDescriptionPost();
        postsPage.fillDescription(PostSchema[randomIndex].post_paragraphs);
        //cy.step('I type the title');
        postsPage.setVisibility('members');
        //cy.step('I set the visibility to members only');
        postsPage.publish();
        //cy.step('I publish the post');
        postsPage.backToEditor();
        postsPage.visitPublished();
        //cy.step('I navigate to posts published page');
        postsPage.verifyPost(titlePost);
        //cy.step('the post is created and only visible to members');
    });
});
