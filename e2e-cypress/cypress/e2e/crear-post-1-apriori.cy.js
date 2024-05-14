import PostSchema from '../../../utils/post_schema.json';

import { PostsPage } from './pages/PostPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/dashboard-page';

describe('CREAPOST1 - Create a post', () => {
  const loginPage = new LoginPage();
  const postsPage = new PostsPage();
  const dashboardPage = new DashboardPage();
  const randomIndex = Math.floor(Math.random() * PostSchema.length);

  it(`T-9 As a user I log in, 
  enter the Posts section, 
  create a new Post (whith title, description, slug, excerpt),
  and then I verify its creation in the Posts list`, () => {

    loginPage.visit();

    loginPage.fillEmail(Cypress.env('email'));
    loginPage.fillPassword(Cypress.env('password'));
    loginPage.submit();

    dashboardPage.waitFor();

    postsPage.visit();

    const titlePost = PostSchema[randomIndex].post_title;
    postsPage.newPost();
    postsPage.fillTitle(titlePost);

    postsPage.clickDescriptionPost();
    postsPage.fillDescription(PostSchema[randomIndex].post_paragraphs);

    postsPage.clickSettings();
    postsPage.fillSlug(PostSchema[randomIndex].post_slug);
    postsPage.fillExcerpt(PostSchema[randomIndex].post_excerpt);


    postsPage.publish();

    postsPage.backToEditor();
    postsPage.visit();

    postsPage.verifyPost(titlePost);
  });
});