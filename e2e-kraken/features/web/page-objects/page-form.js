const GhostPage = require('./ghost-page');

class PageForm extends GhostPage {
  async setTitle(title) {
    const input = await this.driver.$('.gh-editor-title');
    await input.setValue(title);
  }

  async setContent() {
    const input = await this.driver.$('.kg-prose');
    await input.setValue('Lorem Ipsum Dolor Sit Amet');
  }

  async setImage() {
    const button = await this.driver.$('.gh-editor-feature-image-unsplash');
    await button.click();
    const gridSelector = '.gh-unsplash-grid';
    await this.driver.waitUntil(async () => {
      return (await this.driver.$$(gridSelector)).length > 0;
    }, { timeout: 30_000 });
    const imagesGrid = await this.driver.$(gridSelector);
    const images = await imagesGrid.$$('a.gh-unsplash-photo');
    const firstImage = images[0];
    await firstImage.moveTo();
    const insertImageButton = await firstImage.$('//a[contains(text(), "Insert image")]');
    await insertImageButton.click();
  }

  async setAccess() {
    const settingPageButton = await this.driver.$('.settings-menu-toggle');
    await settingPageButton.click();
    const visibilitySelector = await this.driver.$('[data-test-select="post-visibility"]');
    await visibilitySelector.click();
    const paidOption = await this.driver.$('//option[@value="paid"]');
    await paidOption.click();
  }

  async clickSave() {
    const button = await this.driver.$('[data-test-button="publish-flow"]');
    await button.click();
  }

  async clickConfirmPublication() {
    const button = await this.driver.$('[data-test-button="continue"]');
    await button.click();
  }

  async confirmPublish() {
    const button = await this.driver.$('[data-test-button="confirm-publish"]');
    await button.click();
  }
}

module.exports = PageForm;
