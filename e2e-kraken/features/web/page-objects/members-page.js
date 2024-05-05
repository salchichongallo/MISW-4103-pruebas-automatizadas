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
      members.push({
        name: await this._getMemberName(element),
        email: await this._getMemberEmail(element),
      });
    }
    return members;
  }

  async _getMemberName(memberElement) {
    const nameElement = await memberElement.$('.gh-members-list-name');
    return (await nameElement.isExisting())
      ? await nameElement.getText()
      : null;
  }

  async _getMemberEmail(memberElement) {
    const emailElement = await memberElement.$('.gh-members-list-email');
    return (await emailElement.isExisting())
      ? await emailElement.getText()
      : null;
  }
}

module.exports = MembersPage;
