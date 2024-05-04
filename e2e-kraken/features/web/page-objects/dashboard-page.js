const GhostPage = require('./ghost-page');

class DashboardPage extends GhostPage {
  async waitFor() {
    await this.driver.waitUntil(() =>
      this.driver.getUrl().then(url => url.includes('dashboard')),
    );
    await this.driver.waitUntil(() =>
      this.driver.$('h2.gh-canvas-title').then(Boolean),
    );
  }
}

module.exports = DashboardPage;
