const GhostPage = require('./ghost-page');
const PostForm = require('./post-form');

class PostsPage extends GhostPage {
  async visit() {
    const url = new URL(await this.driver.getUrl());
    url.pathname = '/ghost';
    url.hash = '#/posts';
    await this.driver.url(url.toString());
    await this.driver.refresh();
    await this.driver.$('h2=Posts').waitForDisplayed({ timeout: 30_000 });
  }

  async newPost() {
    const link = await this.driver.$('[data-test-new-post-button]');
    await link.click();
    return new PostForm(this);
  }
}

module.exports = PostsPage;
