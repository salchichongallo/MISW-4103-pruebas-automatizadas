const GhostPage = require('./ghost-page');
const MemberForm = require('./member-form');

class MembersPage extends GhostPage {
  async visit() {
    const url = new URL(await this.driver.getUrl());
    url.pathname = '/ghost';
    url.hash = '#/members';
    await this.driver.url(url.toString());
    await this.driver.refresh();
    await this.driver.$('h2=Members').waitForDisplayed({ timeout: 30_000 });
  }

  async newMember() {
    const link = await this.driver.$('[data-test-new-member-button="true"]');
    await link.click();
    await new Promise(resolve => setTimeout(resolve, 1_000));
    return new MemberForm(this);
  }

  async getMembers() {
    const membersElements = await this.driver.$$('.gh-members-list-row');
    const members = [];
    for (const element of membersElements) {
      const nameElement = await element.$('.gh-members-list-name');
      const emailElement = await element.$('.gh-members-list-email');
      members.push({
        name: await nameElement.getText(),
        email: await emailElement.getText(),
      });
    }
    return members;
  }
}

module.exports = MembersPage;
