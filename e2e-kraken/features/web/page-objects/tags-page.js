const TagForm = require('./tag-form');
const GhostPage = require('./ghost-page');

class TagsPage extends GhostPage {
  async visit() {
    const url = new URL(await this.driver.getUrl());
    url.hash = '#/tags';
    await this.driver.url(url.toString());
    await this.driver.refresh();
    await new Promise(resolve => setTimeout(resolve, 5000));
    await this.driver.waitUntil(() => this.driver.$('h2=Tags'));
  }

  async newTag() {
    const link = await this.driver.$('.view-actions a');
    await link.click();
    return new TagForm(this);
  }

  async click(tagName) {
    const link = await this.driver.$(`=${tagName}`);
    await link.click();
  }

  async tagsLists() {
    const tags = await this.driver.$$('.gh-tag-list-name');
    return Promise.all(tags.map(tag => tag.getText()));
  }
}

module.exports = TagsPage;
