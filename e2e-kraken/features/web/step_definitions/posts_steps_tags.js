const { expect } = require('chai');
const { Given, Then } = require('@cucumber/cucumber');
const PostsPage = require('../page-objects/posts-page');
const PublicPostPage = require('../page-objects/public-post-page');

Given('I navigate to posts page', PostsPage.prototype.visit);

Given(
  'I create a post {kraken-string} with tag {kraken-string}',
  async function (postTitle, tagName) {
    const page = new PostsPage(this);
    const form = await page.newPost();

    await form.setTitle(postTitle);
    await form.addTag(tagName);

    const postUrl = await form.publish();
    if (!this.postUrls) {
      this.postUrls = {};
    }
    this.postUrls[postTitle] = postUrl;
  },
);

Given('The publication {kraken-string} is saved', async function (postId) {
  const postAnchor = await this.driver.$('[data-test-complete-bookmark]');
  if (!this.postUrl) {
    this.postUrl = {};
  }
  this.postUrl[postId] = await postAnchor.getAttribute('href');
});

Given('I go back to the dashboard', async function () {
  const backToDashBoard = await this.driver.$('.gh-back-to-editor');
  await backToDashBoard.click();
});

Then(
  'the tags of the page {kraken-string} should not include {kraken-string}',
  async function (postTitle, tagName) {
    const postPage = new PublicPostPage(this);
    await postPage.visit(this.postUrls[postTitle]);
    const title = await postPage.getTitle();

    expect(title).to.exist;
    expect(await title.getText()).to.equal(postTitle);

    const tags = await postPage.getTags();
    expect(tags).not.includes(tagName);
  },
);
