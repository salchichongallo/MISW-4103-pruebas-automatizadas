import { LoginPage } from './pages/LoginPage';
import { MembersPage, MemberForm } from './pages/members-page';

describe('Member creation', () => {
  const loginPage = new LoginPage();
  const membersPage = new MembersPage();
  const memberForm = new MemberForm();

  beforeEach(() => {
    loginPage.visit();
    loginPage.fillEmail(Cypress.env('email'));
    loginPage.fillPassword(Cypress.env('password'));
    loginPage.submit();
  });

  it('Member is created properly', () => {
    membersPage.visit();
    membersPage.newMember();
    memberForm.setName('test member');
    memberForm.setEmail('test@example.com');
    memberForm.clickSave();
    membersPage.visit();
    membersPage.verifyMember('test member', 'test@example.com');
  });
});


