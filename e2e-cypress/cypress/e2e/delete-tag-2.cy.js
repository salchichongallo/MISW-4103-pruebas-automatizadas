import { faker } from '@faker-js/faker';

import { LoginPage } from './pages/LoginPage';
import { TagsPage } from './pages/tags-page';
import { DashboardPage } from './pages/dashboard-page';
import { TagPublicPage } from './pages/tag-public-page';
import { PostsPage } from './pages/posts-page';
import { PublicPostPage } from './pages/public-post-page';

describe('DELTAG2 - Tag is no longer listed in a post', () => {
  it(`
    Given The login page
      And I sign-in with "<email>" and "<password>"
      And I wait for the dashboard
      And I navigate to tags page
      And I create the tag <TAG>
      And I navigate to posts page
      And I create a post <POST> with tag <TAG>
    When I navigate to tags page
      And I select the <TAG> tag
      And I delete the tag
    Then I should not see the tag <TAG>
      And the public page tag <TAG> should not exist
      And the tags of the page <POST> should not include <TAG>
  `, () => {
    const loginPage = new LoginPage();
    const dashboardPage = new DashboardPage();
    const tagsPage = new TagsPage();
    const tagPublicPage = new TagPublicPage();

    loginPage.visit();
    cy.step('The login page');
    loginPage.fillEmail(Cypress.env('email'));
    loginPage.fillPassword(Cypress.env('password'));
    loginPage.submit();
    cy.step('I sign-in with "<email>" and "<password>"');

    dashboardPage.waitFor();
    cy.step('I wait for the dashboard');

    const tagName =
      faker.person.firstName() + Math.random().toString(36).slice(2, 10);
    tagsPage.visit();
    cy.step('I navigate to tags page');

    const tagForm = tagsPage.newTag();
    tagForm.setName(tagName);

    tagForm.getSlug().as('slug', { type: 'static' });

    tagForm.clickSave();
    cy.step('I create the tag <TAG>');

    const postsPage = new PostsPage();
    postsPage.visit();
    cy.step('I navigate to posts page');

    const postTitle = faker.word.words({ count: 1 });
    const postForm = postsPage.newPost();
    postForm.setTitle(postTitle);
    postForm.addTag(tagName);
    postForm.openMenu();
    postForm.publish().as('postUrl', { type: 'static' });
    cy.step('I create a post <POST> with tag <TAG>');

    tagsPage.visit();
    cy.step('I navigate to tags page');

    tagsPage.click(tagName);
    cy.step('I select the <TAG> tag');

    tagForm.clickDelete();
    tagForm.confirmDeletion();
    cy.step('I delete the tag');

    tagsPage.tagLists().should('not.include.text', tagName);
    cy.step('I should not see the tag <TAG>');

    cy.get('@slug').then(slug => {
      tagPublicPage.visit(slug.val());
      tagPublicPage.getTitle().should('have.text', '404');
      cy.step('the public page tag <TAG> should not exist');
    });

    cy.get('@postUrl').then(postUrl => {
      const postPage = new PublicPostPage();
      postPage.visit(postUrl);

      const title = postPage.getTitle();
      title.should('be.visible');
      title.should('have.text', postTitle);

      postPage.getTags().should('not.exist');
      cy.step('the tags of the page <POST> should not include <TAG>');
    });
  });
});
