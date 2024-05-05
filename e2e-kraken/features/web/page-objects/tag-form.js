const GhostPage = require('./ghost-page');

class TagForm extends GhostPage {
  async setName(name) {
    const input = await this.driver.$('#tag-name');
    await input.setValue(name);
  }

  async clickSave() {
    const button = await this.driver.$('[data-test-button="save"]');
    await button.click();
  }

  async clickDelete() {
    const button = await this.driver.$('[data-test-button="delete-tag"]');
    await button.click();
  }

  async confirmDeletion() {
    const button = await this.driver.$('[data-test-button="confirm"]');
    await button.click();
  }

  async getSlug() {
    const input = await this.driver.$('#tag-slug');
    return input.getValue();
  }

  async cancelDelete() {
    const button = await this.driver.$('[data-test-button="cancel"]');
    await button.click();
  }
}

module.exports = TagForm;
