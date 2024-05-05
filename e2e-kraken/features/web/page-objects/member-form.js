const GhostPage = require('./ghost-page');
const MemberImpersonateModal = require('./member-impersonate-modal');

class MemberForm extends GhostPage {
  async setName(name) {
    const input = await this.driver.$('#member-name');
    await input.setValue(name);
  }

  async setEmail(email) {
    const input = await this.driver.$('#member-email');
    await input.setValue(email);
  }

  async clickSave() {
    const button = await this.driver.$('[data-test-button="save"]');
    await button.click();
  }

  async clickActions() {
    const button = await this.driver.$('[data-test-button="member-actions"]');
    await button.click();
  }

  async clickImpersonate() {
    const button = await this.driver.$('[data-test-button="impersonate"]');
    await button.click();
    return new MemberImpersonateModal(this);
  }

  async getErrorMessage() {
    const message = this.driver.$('#member-email + p');
    await message.waitForDisplayed({ timeout: 30_000 });
    return message;
  }
}

module.exports = MemberForm;
