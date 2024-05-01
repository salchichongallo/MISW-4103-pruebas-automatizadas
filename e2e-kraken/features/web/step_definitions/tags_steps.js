const expect = require('chai').expect;
const { Given, When, Then } = require('@cucumber/cucumber');

Given('I navigate to the tags page', async function () {
  const tagsLink = await this.driver.$('[data-test-nav="tags"]');
  await tagsLink.click();
});

When('I create the tag {kraken-string}', async function (tagName) {
  const newTagLink = await this.driver.$('.view-actions a');
  await newTagLink.click();

  const nameInput = await this.driver.$('#tag-name');
  await nameInput.setValue(tagName);

  const saveButton = await this.driver.$('[data-test-button="save"]');
  await saveButton.click();
});

When('I click on the {kraken-string} tag', async function (tagName) {
  const tags = await this.driver.$$('.gh-tag-list-name');

  let tag;
  for (const item of tags) {
    const isSearchedTag = (await item.getText()) === tagName;
    if (isSearchedTag) {
      tag = item;
      break;
    }
  }

  await tag.click();
});

When('I click on the delete tag button', async function () {
  const deleteButton = await this.driver.$('[data-test-button="delete-tag"]');
  await deleteButton.click();
});

When('I confirm the deletion of the tag', async function () {
  const confirmButton = await this.driver.$('[data-test-button="confirm"]');
  await confirmButton.click();
});

Then('I should not see the tag {kraken-string}', async function (tagName) {
  const tags = await this.driver.$$('.gh-tag-list-name');

  let tag;
  for (const item of tags) {
    const isSearchedTag = (await item.getText()) === tagName;
    if (isSearchedTag) {
      tag = item;
      break;
    }
  }

  expect(tag).to.be.undefined;
});

Then(
  'the public page tag {kraken-string} should not exist',
  async function (tagName) {
    const url = new URL(await this.driver.getUrl());
    url.hash = '';
    url.pathname = `/tag/${tagName.toLowerCase()}/`;

    await this.driver.url(url.toString());

    const title = await this.driver.$('h1.error-code');
    expect(title).to.exist;
  },
);
