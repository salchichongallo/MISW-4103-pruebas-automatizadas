import { PostsPage } from './pages/PostPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/dashboard-page';

describe('CREAPOST1 - Create a post', () => {
  const loginPage = new LoginPage();
  const postsPage = new PostsPage();
  const dashboardPage = new DashboardPage();
  let mockData;

  beforeEach(() => {
    cy.request('https://my.api.mockaroo.com/post_schema.json?key=69ae4b80').then((response) => {
        mockData = response.body;
    });

    loginPage.visit();
    loginPage.fillEmail(Cypress.env('email'));
    loginPage.fillPassword(Cypress.env('password'));
    loginPage.submit();
    dashboardPage.waitFor();
}); 

  it(`POST-1.2 As a user I log in, 
  enter the Posts section, 
  create a new Post (whith title, and description, naughty slug and without excerpt),
  and verify its creation in the Posts list`, () => {

    postsPage.visit();
    const titlePost = mockData.post_title;
    postsPage.newPost();
    postsPage.fillTitle(titlePost);

    postsPage.clickDescriptionPost();
    postsPage.fillDescription(mockData.post_paragraphs);
    postsPage.clickSettings();
    postsPage.fillSlug(mockData.post_naughty);
    postsPage.publish();

    postsPage.backToEditor();
    postsPage.visit();

    postsPage.verifyPost(titlePost);
  });
});