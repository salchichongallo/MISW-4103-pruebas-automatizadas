const { expect } = require('chai');
const { Given, When, Then } = require('@cucumber/cucumber');

const TagsPage = require('../page-objects/tags-page');
const TagForm = require('../page-objects/tag-form');
const TagPublicPage = require('../page-objects/tag-public-page');

Given('I navigate to tags page', TagsPage.prototype.visit);

Given ('I select create New Tag', TagsPage.prototype.newTag);

When('I create the tag {kraken-string}', async function (tagName) {
  const page = new TagsPage(this);
  const form = await page.newTag();
  await form.setName(tagName);

  // Save the slug for usage in other steps
  if (!this.tagSlugsByName) {
    this.tagSlugsByName = {};
  }
  this.tagSlugsByName[tagName] = await form.getSlug();

  await form.clickSave();
});

When('I select the {kraken-string} tag', TagsPage.prototype.click);

When('I delete the tag', async function () {
  const form = new TagForm(this);
  await form.clickDelete();
  await form.confirmDeletion();
});

When('I click on delete tag button', async function () {
  const form = new TagForm(this);
  await form.clickDelete();
});

When('I cancel de deletion of the tag', async function () {
  const form = new TagForm(this);
  await form.cancelDelete();
});

When('I create the tag name {kraken-string}', async function (tagName) {
  const form = new TagForm(this);
  await form.setName(tagName);
});

When('I create slug Tag {kraken-string}', async function (slugName) {
  const form = new TagForm(this);
  await form.setSlug(slugName)
});

When('I create the tag description {kraken-string}', async function (description) {
  const form = new TagForm(this);
  await form.setDescription(description);
});

When('I click on the save Tag', async function () {
  const form = new TagForm(this);
  await form.clickSave();
});

Then('I should not see the tag {kraken-string}', async function (tagName) {
  const tagsPage = new TagsPage(this);
  const tags = await tagsPage.tagsLists();
  expect(tags).not.to.include(tagName);
});

Then('I should see the tag {kraken-string}', async function (tagName) {
  const tagsPage = new TagsPage(this);
  const tags = await tagsPage.tagsLists();
  expect(tags).to.include(tagName);
});

Then(
  'the public page tag {kraken-string} should not exist',
  async function (tagName) {
    const tagPage = new TagPublicPage(this);

    const slug = this.tagSlugsByName[tagName];
    await tagPage.visit(slug);
    const title = await tagPage.getTitle();

    expect(title).to.exist;
    expect(await title.getText()).equals('404');
  },
);

Then(
  'I should see an error message saying {string}',
  async function (expectedErrorMessage) {
    const tagsPage = new TagsPage(this);
    const errorMessageElement = await tagsPage.driver.$('.error .response');
    const actualErrorMessage = await errorMessageElement.getText();

    expect(actualErrorMessage.trim()).to.equal(
      expectedErrorMessage,
      `Expected error message to be "${expectedErrorMessage}", but was "${actualErrorMessage}"`,
    );
  },
);


