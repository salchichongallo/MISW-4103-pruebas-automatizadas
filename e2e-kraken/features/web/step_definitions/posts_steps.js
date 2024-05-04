const { expect } = require('chai');
const { Given, When, Then } = require('@cucumber/cucumber');

Given('I navigate to the posts page', async function () {
  const url = new URL(await this.driver.getUrl());
  url.hash = '#/posts';
  await this.driver.url(url.toString());
});

Given('I create a post', async function () {
  const newPostButton = await this.driver.$('[data-test-new-post-button]');
  await newPostButton.click();
});

Given('I set the post title to {kraken-string}', async function (postTitle) {
  const titleInput = await this.driver.$('.gh-editor-title');
  await titleInput.setValue(postTitle);
});

Given('I click on the publish post button', async function () {
  // click on the editor to lose focus and show "Publish" button
  const editorDiv = await this.driver.$('[data-kg="editor"]');
  await editorDiv.click();

  const publishButton = await this.driver.$(
    '[data-test-button="publish-flow"]',
  );
  await publishButton.click();
});

Given('I open the post settings', async function () {
  const toggleSettingsButton = await this.driver.$('.settings-menu-toggle');
  await toggleSettingsButton.click();
});

Given('I add the tag {kraken-string} to the post', async function (tagName) {
  const tagInput = await this.driver.$('#tag-input input');

  await tagInput.click();
  await tagInput.setValue(tagName);

  const dropdownId = await tagInput.getAttribute('aria-controls');

  const options = await this.driver.$$(`#${dropdownId} li`);

  // since tag name should be unique, autocomplete should show one tag
  const tagOption = options[0];
  await tagOption.click();
});

Given('I go to the final review', async function () {
  const continueButton = await this.driver.$('[data-test-button="continue"]');
  await continueButton.click();
});

Given('I confirm the publication', async function () {
  const confirmButton = await this.driver.$(
    '[data-test-button="confirm-publish"]',
  );
  await confirmButton.click();

  // save the post
  const postAnchor = await this.driver.$('[data-test-complete-bookmark]');
  this.postUrl = await postAnchor.getAttribute('href');
});

Given('I go back to the dashboard', async function () {
  const backToDashBoard = await this.driver.$('.gh-back-to-editor');
  await backToDashBoard.click();
});

Then('I visit the post {kraken-string} page', async function (postTitle) {
  await this.driver.url(this.postUrl);
  const title = await this.driver.$('h1.gh-article-title');
  expect(title).to.exist;
  expect(await title.getText()).to.equal(postTitle);
});

Then('the tag {kraken-string} should not be listed', async function (tagName) {
  const tagList = await this.driver.$$('.gh-article-tag');
  const tagNames = await Promise.all(tagList.map(tag => tag.getText()));
  expect(tagNames).not.includes(tagName);
});
