const GhostPage = require('./ghost-page');

class TagPublicPage extends GhostPage {
  async visit(slug) {
    await this.driver.url(`/tag/${slug}`);
    await this.driver.waitUntil(() => this.driver.$(`/tag/${slug}`));
  }

  async getTitle() {
    return this.driver.$('h1');
  }
}

module.exports = TagPublicPage;
