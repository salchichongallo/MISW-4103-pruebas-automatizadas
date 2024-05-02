const { Given, When, Then } = require('@cucumber/cucumber');

// Login
When('I visit the admin panel', async function () {
  return await this.driver.url('http://localhost:2368/ghost');
});

Given('I am on the Ghost admin panel', async function () {
  return await this.driver.url('http://localhost:2368/ghost');
});

When('I enter my email {string}', async function (email) {
  let element = await this.driver.$('[name="identification"]');
  return await element.setValue(email);
});

When('I enter my password {string}', async function (password) {
  let element = await this.driver.$('[name="password"]');
  return await element.setValue(password);
});

When('I click on the login button', async function () {
  let element = await this.driver.$('[id="ember5"]');
  return await element.click();
});

//Post
When('I click on the post button', async function () {
  let element = await this.driver.$('[data-test-nav="posts"]');
  return await element.click();
});

When('I click on the new post button', async function () {
  let element = await this.driver.$('[data-test-new-post-button]');
  return await element.click();
});

When('I enter the title {string}', async function (title) {
  let element = await this.driver.$('[data-test-editor-title-input]');
  return await element.setValue(title);
});

When('I click on the droppable paragraph', async function () {
  let element = await this.driver.$('p[data-koenig-dnd-droppable="true"]');
  return await element.click();
});

When('I click on the publish button', async function () {
  let element = await this.driver.$('[data-test-button="publish-flow"]');
  return await element.click();
});

When('I click on the continue, final review button', async function () {
  let element = await this.driver.$('[data-test-button="continue"]');
  return await element.click();
});

When('I click on the publish post, right now button', async function () {
  let element = await this.driver.$('[data-test-button="confirm-publish"]');
  return await element.click();
});

When('I click on the back to dashboard post button', async function () {
  let element = await this.driver.$('.gh-back-to-editor');
  return await element.click();
});

Then('I should see the post {string}', async function () {
  let element = await this.driver.$('.gh-content-entry-title');
  return await element.getText();
});

