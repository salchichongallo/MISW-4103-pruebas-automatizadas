const { expect } = require('chai');
const { Given, Then } = require('@cucumber/cucumber');
const WebpagesPage = require('../page-objects/webpages-page');

Given('I navigate to webpages page', WebpagesPage.prototype.visit);

Given(
  'I create a webpage {kraken-string} with tag {kraken-string}',
  async function (pageTitle, tagName) {
    const page = new WebpagesPage(this);
    const form = await page.newPage();

    await form.setTitle(pageTitle);
    await form.addTag(tagName);
    await form.publish();
  },
);

Then(
  'the tags of the webpage {kraken-string} should not include {kraken-string}',
  async function (postTitle, tagName) {
    const webpages = new WebpagesPage(this);
    await webpages.visit();
    const page = await webpages.select(postTitle);
    const tags = await page.getCurrentTags();
    expect(tags).not.includes(tagName);
  },
);
