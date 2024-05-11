import { LoginPage } from "../pages_3.42.9/Login-page";
import { DashboardPage } from "../pages_3.42.9/dashboard-page";
import { PagePage } from "../pages_3.42.9/pages-page";

describe('CREAPAGE2 - Save a page as draft', () => {
    const loginPage = new LoginPage();
    const dashboardPage = new DashboardPage();
    const pagesPage = new PagePage();

    beforeEach(() => {
      loginPage.visit();
      cy.step('The login page');
      loginPage.fillEmail(Cypress.env('email'));
      loginPage.fillPassword(Cypress.env('password'));
      loginPage.submit();
      cy.step('I sign-in with "<email>" and "<password>"');
    });

    it('As a user I log in, enter the Pages section, create a new Page as draft and verify its creation in the Pages list', () => {
        dashboardPage.clickPagesLinkByHref();
        cy.step('I navigate to page page');
        pagesPage.clickNewPageLinkByText();
        pagesPage.typeTitle('test page');
        cy.step('I type the title');
        pagesPage.setContent('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
        pagesPage.visit();
        pagesPage.clickAllPagesElement();
        pagesPage.clickDraftPagesElement();
        cy.step('I navigate to draft pages page');
        pagesPage.verifyPage('test page');
        cy.step('the page is created in the Pages list');
    });
  });
