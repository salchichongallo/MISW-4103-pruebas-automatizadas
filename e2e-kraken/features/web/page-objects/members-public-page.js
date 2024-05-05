const GhostPage = require('./ghost-page');
const MemberAccountModal = require('./member-account-modal');

class MembersPublicPage extends GhostPage {
  async visit(loginLink) {
    await this.driver.url(loginLink);
    await this.driver
      .$('[data-testid="portal-trigger-frame"]')
      .waitForDisplayed({ timeout: 30_000 });
    // Wait until pop-up closes
    await new Promise(resolve => setTimeout(resolve, 10_000));
  }

  async openAccountModal() {
    const button = this.driver.$('[data-portal="account"]');
    await button.waitForDisplayed({ timeout: 30_000 });
    await button.click();

    const iframe = await this.driver.findElement(
      'css selector',
      '[data-testid="portal-popup-frame"]',
    );
    await this.driver.switchToFrame(iframe);

    return new MemberAccountModal(this);
  }
}

module.exports = MembersPublicPage;
