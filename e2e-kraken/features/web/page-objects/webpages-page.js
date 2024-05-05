const GhostPage = require('./ghost-page');
const WebpageForm = require('./webpage-form');

class WebpagesPage extends GhostPage {
  async visit() {
    const url = new URL(await this.driver.getUrl());
    url.pathname = '/ghost';
    url.hash = '#/pages';
    await this.driver.url(url.toString());
    await this.driver.refresh();
    await this.driver.$('h2=Pages').waitForDisplayed({ timeout: 30_000 });
  }

  async newPage() {
    const link = await this.driver.$('[data-test-new-page-button]');
    await link.click();
    return new WebpageForm(this);
  }

  async select(postTitle) {
    const postsElements = await this.driver.$$('h3');
    const posts = await Promise.all(postsElements.map(item => item.getText()));
    const postIndex = posts.findIndex(post => post === postTitle);
    const link = postsElements[postIndex];
    await link.click();
    return new WebpageForm(this);
  }
}

module.exports = WebpagesPage;
