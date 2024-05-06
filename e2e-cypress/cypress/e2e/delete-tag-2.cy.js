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
      And I navigate to tags page
      And I create the tag <TAG>
      And I navigate to posts page
      And I create a post <POST> with tag <TAG>
      And I go back to dashboard
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
    loginPage.fillEmail(Cypress.env('email'));
    loginPage.fillPassword(Cypress.env('password'));
    loginPage.submit();

    dashboardPage.waitFor();

    const tagName =
      faker.person.firstName() + Math.random().toString(36).slice(2, 10);
    tagsPage.visit();
    const tagForm = tagsPage.newTag();
    tagForm.setName(tagName);

    tagForm.getSlug().as('slug', { type: 'static' });

    tagForm.clickSave();

    const postsPage = new PostsPage();
    postsPage.visit();
    const postTitle = faker.word.words({ count: 1 });
    const postForm = postsPage.newPost();
    postForm.setTitle(postTitle);
    postForm.addTag(tagName);
    postForm.openMenu();
    postForm.publish().as('postUrl', { type: 'static' });

    tagsPage.visit();
    tagsPage.click(tagName);

    tagForm.clickDelete();
    tagForm.confirmDeletion();

    tagsPage.tagLists().should('not.include.text', tagName);

    cy.get('@slug').then(slug => {
      tagPublicPage.visit(slug.val());
      tagPublicPage.getTitle().should('have.text', '404');
    });

    cy.get('@postUrl').then(postUrl => {
      const postPage = new PublicPostPage();
      postPage.visit(postUrl);

      const title = postPage.getTitle();
      title.should('be.visible');
      title.should('have.text', postTitle);

      postPage.getTags().should('not.exist');
    });
  });
});
