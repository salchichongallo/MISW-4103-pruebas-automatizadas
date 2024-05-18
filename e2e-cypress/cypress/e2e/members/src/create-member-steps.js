import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/dashboard-page';
import { MembersPage, MemberForm } from '../../pages/members-page';

export class CreateMember1Steps {
  constructor() {
    this.loginPage = new LoginPage();
    this.dashboardPage = new DashboardPage();
    this.membersPage = new MembersPage();
    this.memberForm = new MemberForm();
  }

  static givenTheLoginPage() {
    const steps = new CreateMember1Steps();
    steps.loginPage.visit();
    return steps;
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

  andFillTheMemberForm(member, { screenshot = false } = {}) {
    this.memberForm.setName(member.name);
    this.memberForm.setEmail(member.email);
    this.memberForm.setLabels(member.labels);
    this.memberForm.setNote(member.note);
    this.memberForm.toggleNewsletter(member.subscribed);
    if (screenshot) cy.step('And I fill the member form');
    return this;
  }

  andFillEmail(email) {
    this.memberForm.setEmail(email);
    return this;
  }

  andFillNote(note) {
    this.memberForm.setNote(note);
    return this;
  }

  andIClickCreate() {
    this.memberForm.clickSave();
    return this;
  }

  thenINavigateToMembersPage() {
    return this.whenINavigateToMembersPage();
  }

  thenIShouldSeeTheMemberOnTheList(member) {
    cy.get('.gh-members-list-row')
      .should('contain', member.name)
      .and('contain', member.email);
  }

  thenIShouldSeeTheSaveFailureButton() {
    cy.get('[data-test-task-button-state="failure"]').should('be.visible');
    return this;
  }

  thenIShouldSeeEmailRequiredError() {
    cy.contains('Please enter an email.').should('be.visible');
    return this;
  }

  thenIShouldSeeMemberEmailInList(email) {
    cy.get('.gh-members-list-row').should('contain', email);
    return this;
  }

  thenIShouldSeeMemAlreadyExistsError() {
    cy.contains('Member already exists.').should('be.visible');
    return this;
  }

  thenICancelCreation() {
    cy.go('back');
    cy.get('[data-test-leave-button]').click();
    return this;
  }

  thenIDeleteMember(email) {
    this.whenINavigateToMembersPage();
    cy.contains(email).click();
    cy.get('[data-test-button="member-actions"]').click();
    cy.get('[data-test-button="delete-member"]').click();
    cy.get('[data-test-button="confirm"]').click();
    return this;
  }

  takeScreenshot(name) {
    cy.step(name);
    return this;
  }

  thenIShouldSeeEmailInvalidError() {
    cy.get('#member-email + p', { force: true })
      .scrollIntoView()
      .should('be.visible');
    return this;
  }

  thenIShouldSeeNoteTooLongError() {
    cy.contains('Note is too long.').should('be.visible');
    return this;
  }

  thenIShouldSeeNoteUsageOf(total, { screenshot = false } = {}) {
    cy.contains(`used ${total}`);
    if (screenshot) cy.step('should see note usage');
    return this;
  }

  thenIEditMember(email) {
    cy.contains(email).click();
    return this;
  }

  thenNoteIsEmpty() {
    cy.get('#member-note').should('have.value', '');
    return this;
  }
}
