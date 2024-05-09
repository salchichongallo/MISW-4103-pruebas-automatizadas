import { LoginPage } from "../pages_3.42.9/Login-page";
import { DashboardPage } from "../pages_3.42.9/dashboard-page";
import { PagePage } from "../pages_3.42.9/pages-page";

describe('Create a page', () => {
    const loginPage = new LoginPage();
    const dashboardPage = new DashboardPage();
    const pagesPage = new PagePage();
  
    beforeEach(() => {
      loginPage.visit();
      loginPage.fillEmail(Cypress.env('email'));
      loginPage.fillPassword(Cypress.env('password'));
      loginPage.submit();
    });
  
    it('As a user I log in, enter the Pages section, create a new Page and verify its creation in the Pages list', () => {
        dashboardPage.clickPagesLinkByHref();
        pagesPage.clickNewPageLinkByText();
        pagesPage.typeTitle('test page');
        pagesPage.setContent('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
        pagesPage.clickPublishButton();
        pagesPage.visit();
        pagesPage.verifyPage('test page');
    });
  });