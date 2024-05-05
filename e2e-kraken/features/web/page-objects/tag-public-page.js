const GhostPage = require('./ghost-page');

class TagPublicPage extends GhostPage {
  async visit(slug) {
    await this.driver.url(`/tag/${slug}`);
    await this.driver.$('#main').waitForDisplayed();
  }

  async getTitle() {
    return this.driver.$('h1');
  }
}

module.exports = TagPublicPage;
