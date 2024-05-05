const GhostPage = require('./ghost-page');

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
}

module.exports = MemberForm;
