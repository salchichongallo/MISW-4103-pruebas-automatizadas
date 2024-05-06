import { LoginPage } from './pages/LoginPage';
import { PagesPage } from './pages/pages-page';

describe('Save a page as draft with title, content and image', () => {
  const loginPage = new LoginPage();
  const pagesPage = new PagesPage();

  beforeEach(() => {
    loginPage.visit();
    loginPage.fillEmail(Cypress.env('email'));
    loginPage.fillPassword(Cypress.env('password'));
    loginPage.submit();
  });

  it('As a user I log in, enter the Pages section, create a new Page with title, content and image as draft and verify its creation in the Pages list', () => {
    pagesPage.visit();
    const pageForm = pagesPage.newPage();
    pageForm.setTitle('test page');
    pageForm.setContent('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
    pageForm.setImage();
    cy.wait(2000);
    pagesPage.visit();
    pagesPage.verifyPage('test page');
  });
});
