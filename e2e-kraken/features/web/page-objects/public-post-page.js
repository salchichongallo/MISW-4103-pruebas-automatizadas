const GhostPage = require('./ghost-page');

class PublicPostPage extends GhostPage {
  async visit(url) {
    await this.driver.url(url);
    await this.driver.$('main').waitForDisplayed({ timeout: 30_000 });
  }

  getTitle() {
    return this.driver.$('h1');
  }

  async getTags() {
    const tagList = await this.driver.$$('.gh-article-tag');
    return Promise.all(tagList.map(tag => tag.getText()));
  }
}

module.exports = PublicPostPage;
