const { expect } = require('chai');
const { Given, When, Then } = require('@cucumber/cucumber');

Given('I navigate to the pages page', async function () {
  const pagesLink = await this.driver.$('[data-test-nav="pages"]');
  await pagesLink.click();
});

Given('I create a page', async function () {
  const newPageButton = await this.driver.$('[data-test-new-page-button]');
  await newPageButton.click();
});

Given('I click on the page {kraken-string}', async function (pageTitle) {
  const pages = await this.driver.$$('.gh-content-entry-title');

  let page;
  for (const item of pages) {
    const isSearchedPage = (await item.getText()) === pageTitle;
    if (isSearchedPage) {
      page = item;
      break;
    }
  }

  await page.click();
});

Then('The tag {kraken-string} is not present', async function (tagName) {
  const tagElements = await this.driver.$$(
    '#tag-input li [data-test-selected-token]',
  );
  const tagList = await Promise.all(tagElements.map(tag => tag.getText()));
  expect(tagList).not.includes(tagName);
});
