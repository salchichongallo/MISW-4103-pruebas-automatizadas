const { expect } = require('chai');
const { When, Then } = require('@cucumber/cucumber');
const MembersPage = require('../page-objects/members-page');
const MemberForm = require('../page-objects/member-form');

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
