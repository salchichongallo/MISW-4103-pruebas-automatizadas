import { LoginPage } from './pages/LoginPage';
import { PagesPage } from './pages/pages-page';

describe('PSEUDO: Save a page as draft with only title and image', () => {
  const loginPage = new LoginPage();
  const pagesPage = new PagesPage();

  let mockData;
  beforeEach(() => {
    cy.request('https://api.mockaroo.com/api/202bab00?count=10&key=57a96b40').then(
      response => {
        mockData = response.body;
      },
    );
    loginPage.visit();
    loginPage.fillEmail(Cypress.env('email'));
    loginPage.fillPassword(Cypress.env('password'));
    loginPage.submit();
  });

  it('As a user I log in, enter the Pages section, create a new Page with title and image as draft and verify its creation in the Pages list', () => {
    const title = mockData.title;

    pagesPage.visit();
    cy.step('I navigate to pages page');
    const pageForm = pagesPage.newPage();
    pageForm.setTitle(title);
    cy.step('I create the page title');
    pageForm.setImage();
    cy.step('I create the page image');
    cy.wait(2000);
    pagesPage.visit();
    cy.step('I navigate to pages page');
    pagesPage.verifyPage('test page');
    cy.step('I verify the page creation');
  });
});
