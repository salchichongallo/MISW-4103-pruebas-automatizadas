const GhostPage = require('./ghost-page');

class DashboardPage extends GhostPage {
  async visit() {
    const url = new URL(await this.driver.getUrl());
    url.hash = '#/dashboard';
    await this.driver.url(url.toString());
    await this.driver.refresh();
    await this.driver.$('h2=Dashboard').waitForDisplayed({ timeout: 30_000 });
  }

  async waitFor() {
    await this.driver
      .$('h2.gh-canvas-title')
      .waitForDisplayed({ timeout: 30_000 });
  }
}

module.exports = DashboardPage;
