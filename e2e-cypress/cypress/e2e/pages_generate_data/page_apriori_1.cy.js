import { LoginPage } from '../pages/LoginPage';
import { PagesPage } from '../pages/pages-page';
import { DashboardPage } from '../pages/dashboard-page';

import pageDataMockaroo from './data-apriori-pages.json';

describe('APRIORI: CREAPAGE1 - Create a page', () => {
  const loginPage = new LoginPage();
  const pagesPage = new PagesPage();
  const dashboardPage = new DashboardPage();

  it('As a user I log in, enter the Pages section, create a new Page and verify its creation in the Pages list', () => {
    loginPage.visit();
    cy.step('The login page');

    loginPage.fillEmail(Cypress.env('email'));
    loginPage.fillPassword(Cypress.env('password'));
    loginPage.submit();
    cy.step('I sign-in with "<email>" and "<password>"');

    dashboardPage.waitFor();
    pagesPage.visit();
    cy.step('I navigate to page page');

    const pageForm = pagesPage.newPage();
    pageForm.setTitle(pageDataMockaroo[0].title);
    cy.step('I type the title');

    pageForm.setContent(pageDataMockaroo[0].content);
    cy.step('I type the content');

    pageForm.publish();
    cy.step('I publish the page');

    pagesPage.visit();
    cy.step('I navigate to pages page');

    pagesPage.verifyPage(pageDataMockaroo[0].title);
    cy.step('the page is created and listed in the pages page');
  });
});
