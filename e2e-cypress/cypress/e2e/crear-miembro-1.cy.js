import { faker } from '@faker-js/faker';

import { LoginPage } from './pages/LoginPage';
import { MembersPage, MemberForm } from './pages/members-page';
import { DashboardPage } from './pages/dashboard-page';

describe('Member creation', () => {
  const loginPage = new LoginPage();
  const membersPage = new MembersPage();
  const memberForm = new MemberForm();
  const dashboardPage = new DashboardPage();

  beforeEach(() => {
    loginPage.visit();
    loginPage.fillEmail(Cypress.env('email'));
    loginPage.fillPassword(Cypress.env('password'));
    loginPage.submit();
    dashboardPage.waitFor();
  });

  it('Member is created properly', () => {
    const email = faker.internet.email();
    membersPage.visit();
    membersPage.newMember();
    memberForm.setName('test member');
    memberForm.setEmail(email);
    memberForm.clickSave();
    membersPage.visit();
    membersPage.verifyMember('test member', email);
  });
});
