import { PostsPage } from './pages/PostPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/dashboard-page';

describe('Create a post', () => {
  const loginPage = new LoginPage();
  const postsPage = new PostsPage();
  const dashboardPage = new DashboardPage();

  beforeEach(() => {
    loginPage.visit();
    loginPage.fillEmail(Cypress.env('email'));
    loginPage.fillPassword(Cypress.env('password'));
    loginPage.submit();
    dashboardPage.waitFor();
  });

  it('As a user I log in, enter the Posts section, create a new Post and verify its creation in the Posts list', () => {
    postsPage.visit();
    postsPage.newPost();
    postsPage.fillTitle('test post');
    postsPage.clickDescriptionPost();
    postsPage.publish();
    postsPage.backToEditor();
    postsPage.visit();
    postsPage.verifyPost('test post');
  });
});
