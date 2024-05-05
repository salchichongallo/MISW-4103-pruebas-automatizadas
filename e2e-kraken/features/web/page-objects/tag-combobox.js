const GhostPage = require('./ghost-page');

class TagCombobox extends GhostPage {
  async select(tagName) {
    const input = await this.driver.$('#tag-input input');

    await input.click();
    await input.setValue(tagName);

    const dropdownId = await input.getAttribute('aria-controls');
    const options = await this.driver.$$(`#${dropdownId} li`);

    // Since tag name should be unique, autocomplete should show one tag
    const tagOption = options[0];
    await tagOption.click();
  }

  async getSelectedTags() {
    const elements = await this.driver.$$(
      '#tag-input .ember-power-select-multiple-inner-text',
    );
    return Promise.all(elements.map(element => element.getText()));
  }
}

module.exports = TagCombobox;
