const GhostPage = require('./ghost-page');

class MemberImpersonateModal extends GhostPage {
  async waitFor() {
    await this.driver.$('.modal-impersonate-member').waitForDisplayed();
  }

  async copyLink() {
    await this.driver
      .$('[data-test-button="copy-impersonate-link"]')
      .waitForDisplayed();
    const input = await this.driver.$('#member-signin-url');
    const authLink = await input.getValue();
    return authLink;
  }
}

module.exports = MemberImpersonateModal;
