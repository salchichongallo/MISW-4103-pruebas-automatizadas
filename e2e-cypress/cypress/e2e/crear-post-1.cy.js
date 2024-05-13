import { faker } from '@faker-js/faker';

import { PostsPage } from './pages/PostPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/dashboard-page';

describe('CREAPOST1 - Create a post', () => {
  const loginPage = new LoginPage();
  const postsPage = new PostsPage();
  const dashboardPage = new DashboardPage();

  it('T-9 As a user I log in, enter the Posts section, create a new Post and verify its creation in the Posts list', () => {
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
    //cy.step('I type the title');

    postsPage.clickDescriptionPost();
    postsPage.publish();
    //cy.step('I publish the post');

    postsPage.backToEditor();
    postsPage.visit();
    //cy.step('I navigate to posts page');

    postsPage.verifyPost(titlePost);
    //cy.step('the post is created and listed in the posts page');
  });
});
