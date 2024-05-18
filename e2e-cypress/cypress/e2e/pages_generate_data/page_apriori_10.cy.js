import { LoginPage } from './pages/LoginPage';
import { PagesPage } from './pages/pages-page';

describe('APRIORI: Save a page as draft with image only', () => {
  const loginPage = new LoginPage();
  const pagesPage = new PagesPage();

  beforeEach(() => {
    loginPage.visit();
    loginPage.fillEmail(Cypress.env('email'));
    loginPage.fillPassword(Cypress.env('password'));
    loginPage.submit();
  });

  it('As a user I log in, enter the Pages section, create a new Page with image as draft and verify its creation in the Pages list', () => {
    pagesPage.visit();
    cy.step('I navigate to pages page');
    const pageForm = pagesPage.newPage();
    pageForm.setImage();
    cy.step('I create the page image');
    cy.wait(2000);
    pagesPage.visit();
    cy.step('I navigate to pages page');
    pagesPage.verifyPage('test page');
    cy.step('I verify the page creation');
  });
});
