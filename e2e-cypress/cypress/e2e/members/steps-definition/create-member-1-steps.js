import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/dashboard-page';
import { MembersPage, MemberForm } from '../../pages/members-page';

export class CreateMember1Steps {
  constructor(member) {
    this.member = member;

    this.loginPage = new LoginPage();
    this.dashboardPage = new DashboardPage();
    this.membersPage = new MembersPage();
    this.memberForm = new MemberForm();
  }

  /** @param {import('../src/member-provider').MemberDataProvider} provider */
  static async prepare(provider) {
    const member = await provider.getMember();
    return new CreateMember1Steps(member);
  }

  run() {
    this.givenTheLoginPage().andISignIn().andIWaitForTheDashboard();

    this.whenINavigateToMembersPage()
      .andIClickOnNewMember()
      .andFillTheMemberForm()
      .andIClickCreate();

    this.thenINavigateToMembersPage().thenIShouldSeeTheMemberOnTheList();
  }

  givenTheLoginPage() {
    this.loginPage.visit();
    return this;
  }

  andISignIn() {
    this.loginPage.fillEmail(Cypress.env('email'));
    this.loginPage.fillPassword(Cypress.env('password'));
    this.loginPage.submit();
    return this;
  }

  andIWaitForTheDashboard() {
    this.dashboardPage.waitFor();
    return this;
  }

  whenINavigateToMembersPage() {
    this.membersPage.visit();
    return this;
  }

  andIClickOnNewMember() {
    this.membersPage.newMember();
    return this;
  }

  andFillTheMemberForm() {
    this.memberForm.setName(this.member.name);
    this.memberForm.setEmail(this.member.email);
    this.memberForm.setLabels(this.member.labels);
    this.memberForm.setNote(this.member.note);
    this.memberForm.toggleNewsletter(this.member.subscribed);
    return this;
  }

  andIClickCreate() {
    this.memberForm.clickSave();
    return this;
  }

  thenINavigateToMembersPage() {
    return this.whenINavigateToMembersPage();
  }

  thenIShouldSeeTheMemberOnTheList() {
    cy.get('.gh-members-list-row')
      .should('contain', this.member.name)
      .and('contain', this.member.email);
  }
}
