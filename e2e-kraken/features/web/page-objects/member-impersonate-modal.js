const GhostPage = require('./ghost-page');

class MemberImpersonateModal extends GhostPage {
  async waitFor() {
    await this.driver.$('.modal-impersonate-member').waitForDisplayed();
  }

  async copyLink() {
    const button = await this.driver.$(
      '[data-test-button="copy-impersonate-link"]',
    );
    const input = await this.driver.$('#member-signin-url');
    const authLink = await input.getValue();
    await button.click();
    await button
      .$('[data-test-task-button-state="success"]')
      .waitForDisplayed();
    return authLink;
  }
}

module.exports = MemberImpersonateModal;
