import { LoginPage } from './pages/LoginPage';
import { PagesPage } from './pages/pages-page';
import { DashboardPage } from './pages/dashboard-page';

describe('CREAPAGE2 - Save a page as draft', () => {
  const loginPage = new LoginPage();
  const pagesPage = new PagesPage();
  const dashboardPage = new DashboardPage();

  beforeEach(() => {
    loginPage.visit();
    cy.step('The login page');
    loginPage.fillEmail(Cypress.env('email'));
    loginPage.fillPassword(Cypress.env('password'));
    loginPage.submit();
    cy.step('I sign-in with "<email>" and "<password>"');
    dashboardPage.waitFor();
  });

  it('As a user I log in, enter the Pages section, create a new Page as draft and verify its creation in the Pages list', () => {
    pagesPage.visit();
    cy.step('I navigate to page page');
    const pageForm = pagesPage.newPage();
    pageForm.setTitle('test page');
    pagesPage.visit();
    cy.step('I navigate to draft pages page');
    pagesPage.verifyPage('test page');
    cy.step('the page is created in the Pages list');
  });
});
