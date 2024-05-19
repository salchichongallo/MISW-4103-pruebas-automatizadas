import { LoginPage } from '../pages/LoginPage';
import { PagesPage } from '../pages/pages-page';
import { DashboardPage } from '../pages/dashboard-page';

describe('PSEUDO: CREAPAGE1 - Create a page', () => {
  const loginPage = new LoginPage();
  const pagesPage = new PagesPage();
  const dashboardPage = new DashboardPage();

  let mockData;
  beforeEach(() => {
    cy.request('https://my.api.mockaroo.com/pagesPseudo?key=57a96b40').then(
      response => {
        mockData = response.body;
      },
    );
  });

  it('As a user I log in, enter the Pages section, create a new Page and verify its creation in the Pages list', () => {
    const title = mockData.title;
    const content = mockData.content;

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
    pageForm.setTitle(title);
    cy.step('I type the title');

    pageForm.setContent(content);
    cy.step('I type the content');

    pageForm.publish();
    cy.step('I publish the page');

    pagesPage.visit();
    cy.step('I navigate to pages page');

    pagesPage.verifyPage(title);
    cy.step('the page is created and listed in the pages page');
  });
});
