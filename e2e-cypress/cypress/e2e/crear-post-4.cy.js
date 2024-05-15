import { faker } from '@faker-js/faker';

import { PostsPage } from './pages/PostPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/dashboard-page';

describe('CREAPOST4 - Create a post', () => {
    const loginPage = new LoginPage();
    const postsPage = new PostsPage();
    const dashboardPage = new DashboardPage();

    it(`POST-4 - As a user I log in, 
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

        const titlePost = faker.word.words({ count: 1 });
        postsPage.newPost();
        postsPage.fillTitle(titlePost);
        postsPage.clickSettings();
        postsPage.fillSlug(faker.lorem.slug());
        //cy.step('I type the title');

        postsPage.backToPosts();
        postsPage.visitPublished();
        //cy.step('I navigate to published posts page');

        postsPage.verifyPostNotInPublished(titlePost);
        //cy.step('the post is not listed in the published posts page');
    });
});
