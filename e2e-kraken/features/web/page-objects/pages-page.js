const GhostPage = require('./ghost-page');

class PagesPage extends GhostPage {
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
  }

  async getPages() {
    const pagesElements = await this.driver.$$('.gh-content-entry-title');
    const pages = [];
    for (const element of pagesElements) {
      pages.push(await element.getText());
    }
    return pages;
  }

  async getDraftPages() {
    const pagesElements = await this.driver.$$('.gh-content-entry-title');
    const pages = [];
    for (const element of pagesElements) {
      const title = await element.getText();
      const draft = await element.$('.draft');
      if (draft) {
        pages.push(title);
      }
    }
    return pages;
  }

  async goBack() {
    const link = await this.driver.$('[data-test-link="pages"]');
    await link.click();
  }
}

module.exports = PagesPage;
