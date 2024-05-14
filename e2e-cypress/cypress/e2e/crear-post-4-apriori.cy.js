import PostSchema from '../../../utils/post_schema.json';

import { PostsPage } from './pages/PostPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/dashboard-page';

describe('CREAPOST4 - Create a post', () => {
    const loginPage = new LoginPage();
    const postsPage = new PostsPage();
    const dashboardPage = new DashboardPage();
    const randomIndex = Math.floor(Math.random() * PostSchema.length);

    it(`T12 - As a user I log in, 
    enter the Posts section, 
    create a new Post whith title and slug, without publishing it 
    and it should not appear on the published page`, () => {
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
        postsPage.clickSettings();
        postsPage.fillSlug(PostSchema[randomIndex].post_slug);
        //cy.step('I type the title');

        postsPage.backToPosts();
        postsPage.visitPublished();
        //cy.step('I navigate to published posts page');

        postsPage.verifyPostNotInPublished(titlePost);
        //cy.step('the post is not listed in the published posts page');
    });
});
