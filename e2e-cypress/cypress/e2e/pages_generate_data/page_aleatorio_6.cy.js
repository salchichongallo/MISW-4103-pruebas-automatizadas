import { LoginPage } from './pages/LoginPage';
import { PagesPage } from './pages/pages-page';

import { faker } from '@faker-js/faker';

describe('ALEATORIO: Create a page with exist title', () => {
  const loginPage = new LoginPage();
  const pagesPage = new PagesPage();

  beforeEach(() => {
    loginPage.visit();
    loginPage.fillEmail(Cypress.env('email'));
    loginPage.fillPassword(Cypress.env('password'));
    loginPage.submit();
  });

  it('As a user I log in, enter the Pages section, create a new Page with exist title and content and verify its creation in the Pages list', () => {
    const title = faker.lorem.words(5);
    const content = faker.lorem.paragraphs();

    pagesPage.visit();
    cy.step('I navigate to pages page');
    const pageForm = pagesPage.newPage();
    pageForm.setTitle(title);
    cy.step('I create the page title');
    pageForm.setContent(content);
    cy.step('I create the page content');
    pageForm.publish();
    cy.step('I publish the page');
    pagesPage.visit();
    cy.step('I navigate to pages page');
    pagesPage.verifyPage('test page');
    cy.step('I verify the page creation');
  });
});
