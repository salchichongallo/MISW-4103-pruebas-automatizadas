const { expect } = require('chai');
const { When, Then } = require('@cucumber/cucumber');
const MembersPage = require('../page-objects/members-page');
const MemberForm = require('../page-objects/member-form');
const MembersPublicPage = require('../page-objects/members-public-page');
const MemberAccountModal = require('../page-objects/member-account-modal');
const MemberImpersonateModal = require('../page-objects/member-impersonate-modal');

When('I navigate to members page', MembersPage.prototype.visit);

When('I click on new member', MembersPage.prototype.newMember);

When('I set the member name to {kraken-string}', async function (memberName) {
  const page = new MemberForm(this);
  await page.setName(memberName);
});

When('I set the member email to {kraken-string}', async function (memberEmail) {
  const page = new MemberForm(this);
  await page.setEmail(memberEmail);
});

When('I create the member', MemberForm.prototype.clickSave);

Then(
  'I should see the member name {kraken-string} on the list',
  async function (memberName) {
    const page = new MembersPage(this);
    const members = await page.getMembers();
    const names = members.map(member => member.name);
    expect(names).to.includes(memberName);
  },
);

Then(
  'I should see the member email {kraken-string} on the list',
  async function (memberEmail) {
    const page = new MembersPage(this);
    const members = await page.getMembers();
    const emails = members.map(member => member.email);
    expect(emails).to.includes(memberEmail);
  },
);

When('I open member actions', MemberForm.prototype.clickActions);

When('I impersonate the new member', async function () {
  const form = new MemberForm(this);
  const modal = await form.clickImpersonate();
  await modal.waitFor();
});

When('I authenticate as the member', async function () {
  const memberPage = new MembersPublicPage(this);
  const modal = new MemberImpersonateModal(this);
  const authLink = await modal.copyLink();
  await memberPage.visit(authLink);
});

When(
  'I open the member account modal',
  MembersPublicPage.prototype.openAccountModal,
);

Then(
  'I should see the member name {kraken-string} in the account modal',
  async function (memberName) {
    const modal = new MemberAccountModal(this);
    const name = await modal.getName();
    expect(await name.getText()).to.be.equal(memberName);
  },
);

Then(
  'I should see the member email {kraken-string} in the account modal',
  async function (memberEmail) {
    const modal = new MemberAccountModal(this);
    const email = await modal.getEmail();
    expect(await email.getText()).to.be.equal(memberEmail);
  },
);

When(
  'I set the name in the member modal to {kraken-string}',
  async function (memberName) {
    const modal = new MemberAccountModal(this);
    await modal.editProfile();
    await modal.setName(memberName);
    await modal.saveProfile();
    await modal.close();
  },
);
