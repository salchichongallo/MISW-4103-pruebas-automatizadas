import { LoginPage } from './pages/LoginPage';
import { PagesPage } from './pages/pages-page';

describe('Create a page with title, content, image and access only for members paid', () => {
  const loginPage = new LoginPage();
  const pagesPage = new PagesPage();

  beforeEach(() => {
    loginPage.visit();
    loginPage.fillEmail(Cypress.env('email'));
    loginPage.fillPassword(Cypress.env('password'));
    loginPage.submit();
  });

  it('As a user I log in, enter the Pages section, create a new Page with title, content, image and access only for members paid, and verify its creation in the Pages list', () => {
    pagesPage.visit();
    const pageForm = pagesPage.newPage();
    pageForm.setTitle('test page');
    pageForm.setContent('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
    pageForm.setImage();
    pageForm.setAccess('paid');
    pageForm.publish();
    pagesPage.visit();
    pagesPage.verifyPage('test page');
  });
});
