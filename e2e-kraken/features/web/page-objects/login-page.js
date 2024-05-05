const GhostPage = require('./ghost-page');

class LoginPage extends GhostPage {
  async visit() {
    await this.driver.url('/ghost');
    await this.driver.$('#login').waitForDisplayed({ timeout: 30_000 });
  }

  async setEmail(email) {
    const input = await this.driver.$('#identification');
    await input.setValue(email);
  }

  async setPassword(password) {
    const input = await this.driver.$('#password');
    await input.setValue(password);
  }

  async submit() {
    const button = await this.driver.$('[data-test-button="sign-in"]');
    await button.click();
  }
}

module.exports = LoginPage;
