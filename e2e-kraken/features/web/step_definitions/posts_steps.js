const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const PostsPage = require('../page-objects/posts-page');

//Post
When('I click on the post button', async function () {
    const postsPage = new PostsPage(this);
    await postsPage.clickOnPostButton();
});

When('I click on the new post button', async function () {
    const postsPage = new PostsPage(this);
    await postsPage.clickOnNewPostButton();
});

When('I enter the title {string}', async function (title) {
    const postsPage = new PostsPage(this);
    await postsPage.enterTitle(title);
});

When('I click on the droppable paragraph', async function () {
    const postsPage = new PostsPage(this);
    await postsPage.clickOnDroppableParagraph();
});

When('I click on the publish button', async function () {
    const postsPage = new PostsPage(this);
    await postsPage.clickOnPublishButton();
});

When('I click on the continue, final review button', async function () {
    const postsPage = new PostsPage(this);
    return await postsPage.clickOnContinueFinalReviewButton();
});

When('I click on the publish post, right now button', async function () {
    const postsPage = new PostsPage(this);
    await postsPage.clickOnPublishPostRightNowButton();
});

When('I click on the back to dashboard post button', async function () {
    const postsPage = new PostsPage(this);
    return await postsPage.clickOnBackToDashboardPostButton();
});

Then('I should see the post {kraken-string}', async function (postTitle) {
    const postsPage = new PostsPage(this);
    const elements = await postsPage.driver.$$('.gh-content-entry-title');
    const titles = await Promise.all(elements.map(element => element.getText()));
    assert(titles.includes(postTitle));
});

When('I click on the settings button', async function () {
    const postsPage = new PostsPage(this);
    await postsPage.clickOnSettingsButton();
});

When('I select the Members only option', async function () {
    const postsPage = new PostsPage(this);
    await postsPage.selectMembersOnlyOption();
});

When('I click the post {kraken-string}', async function (postTitle) {
    const postsPage = new PostsPage(this);
    await postsPage.clickOnPost(postTitle);
});

Then('I validate on the View post link', async function () {
    const postsPage = new PostsPage(this);
    await postsPage.clickOnViewPostLink();
});

When('I click on the Posts link back', async function () {
    const postsPage = new PostsPage(this);
    await postsPage.clickOnPostsLinkBack();
});

When('I click on the Published link', async function () {
    const postsPage = new PostsPage(this);
    await postsPage.clickOnPublishedLink();
});

Then('I should not see the post {kraken-string}', async function (postTitle) {
    const postsPage = new PostsPage(this);
    const elements = await postsPage.driver.$$('.gh-content-entry-title');
    const titles = await Promise.all(elements.map(element => element.getText()));
    assert(!titles.includes(postTitle));
});

When('I click on the Draft link', async function () {
    const postsPage = new PostsPage(this);
    await postsPage.clickOnDraftLink();
});

Then('I should see the post in drafts {kraken-string}', async function (postTitle) {
    const postsPage = new PostsPage(this);
    const element = await postsPage.driver.$('.gh-content-entry-title');
    const text = await element.getText();
    assert.equal(text, postTitle);
});