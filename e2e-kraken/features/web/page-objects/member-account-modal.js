const GhostPage = require('./ghost-page');

class MemberAccountModal extends GhostPage {
  async getName() {
    return this.driver.$('.account-home .gh-portal-list-detail h3');
  }

  async getEmail() {
    return this.driver.$('.account-home .gh-portal-list-detail p');
  }

  async setName(name) {
    const input = await this.driver.$('#input-name');
    await input.setValue(name);
  }

  async editProfile() {
    const button = await this.driver.$(
      '.account-home [data-test-button="edit-profile"]',
    );
    await button.click();
  }

  async saveProfile() {
    const button = await this.driver.$('[data-test-button="save-button"]');
    await button.click();

    await this.driver
      .$('.gh-portal-popupnotification')
      .waitForDisplayed({ timeout: 10_000 });
  }

  async close() {
    const icon = await this.driver.$('[data-testid="close-popup"]');
    await icon.click();
    await this.driver.switchToParentFrame();
  }
}

module.exports = MemberAccountModal;
