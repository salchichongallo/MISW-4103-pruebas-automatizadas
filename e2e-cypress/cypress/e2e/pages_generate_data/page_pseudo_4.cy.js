import { LoginPage } from '../pages/LoginPage';
import { PagesPage } from '../pages/pages-page';

describe('PSEUDO: Create a page with title, content, image and access only for members paid', () => {
  const loginPage = new LoginPage();
  const pagesPage = new PagesPage();

  let mockData;
  beforeEach(() => {
    cy.request('https://my.api.mockaroo.com/pagesPseudo?key=57a96b40').then(
      response => {
        mockData = response.body;
      },
    );
    loginPage.visit();
    loginPage.fillEmail(Cypress.env('email'));
    loginPage.fillPassword(Cypress.env('password'));
    loginPage.submit();
  });

  it('As a user I log in, enter the Pages section, create a new Page with title, content, image and access only for members paid, and verify its creation in the Pages list', () => {
    const title = mockData.title;
    const content = mockData.content;

    pagesPage.visit();
    cy.step('I navigate to pages page');
    const pageForm = pagesPage.newPage();
    pageForm.setTitle(title);
    cy.step('I create the page title');
    pageForm.setContent(content);
    cy.step('I create the page content');
    pageForm.setImage();
    cy.step('I create the page image');
    pageForm.setAccess('paid');
    cy.step('I set the page policy access');
    pageForm.publish();
    cy.step('I publish the page');
    pagesPage.visit();
    cy.step('I navigate to pages page');
    pagesPage.verifyPage('test page');
    cy.step('I verify the page creation');
  });
});
