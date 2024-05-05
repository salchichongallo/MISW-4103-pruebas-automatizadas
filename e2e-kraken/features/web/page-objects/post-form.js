const GhostPage = require('./ghost-page');
const TagCombobox = require('./tag-combobox');

class PostForm extends GhostPage {
  async setTitle(title) {
    const input = await this.driver.$('.gh-editor-title');
    await input.setValue(title);
  }

  async addTag(tagName) {
    await this.openMenu();
    const tag = new TagCombobox(this);
    await tag.select(tagName);
  }

  async openMenu() {
    const button = await this.driver.$('.settings-menu-toggle');
    await button.click();
  }

  async publish() {
    await this.clickPublish();
    await this.clickFinalReview();
    return this.confirmPublication();
  }

  async clickPublish() {
    const button = await this.driver.$('[data-test-button="publish-flow"]');
    await button.click();
  }

  async clickFinalReview() {
    const button = await this.driver.$('[data-test-button="continue"]');
    await button.click();
  }

  async confirmPublication() {
    const button = await this.driver.$('[data-test-button="confirm-publish"]');
    await button.click();

    const postAnchor = this.driver.$('[data-test-complete-bookmark]');
    await postAnchor.waitForDisplayed();
    return postAnchor.getAttribute('href');
  }
}

module.exports = PostForm;
