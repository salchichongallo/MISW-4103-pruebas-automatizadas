import { LoginPage } from './pages/LoginPage';
import { PagesPage } from './pages/pages-page';

describe('Save a page as draft', () => {
  const loginPage = new LoginPage();
  const pagesPage = new PagesPage();

  beforeEach(() => {
    loginPage.visit();
    loginPage.fillEmail(Cypress.env('email'));
    loginPage.fillPassword(Cypress.env('password'));
    loginPage.submit();
  });

  it('As a user I log in, enter the Pages section, create a new Page as draft and verify its creation in the Pages list', () => {
    pagesPage.visit();
    const pageForm = pagesPage.newPage();
    pageForm.setTitle('test page');
    pagesPage.visit();
    pagesPage.verifyPage('test page');
  });
});
