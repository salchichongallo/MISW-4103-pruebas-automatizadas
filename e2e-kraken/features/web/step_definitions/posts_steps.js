const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const PostsPage = require('../page-objects/posts-page');

//Post
When('I click on the post button', async function () {
    let postsPage = new PostsPage();
    return await postsPage.clickOnPostButton(this.driver);
});

When('I click on the new post button', async function () {
    let postsPage = new PostsPage();
    return await postsPage.clickOnNewPostButton(this.driver);
});

When('I enter the title {string}', async function (title) {
    let postsPage = new PostsPage();
    return await postsPage.enterTitle(this.driver, title);
});

When('I click on the droppable paragraph', async function () {
    let postsPage = new PostsPage();
    return await postsPage.clickOnDroppableParagraph(this.driver);
});

When('I click on the publish button', async function () {
    let postsPage = new PostsPage();
    return await postsPage.clickOnPublishButton(this.driver);
});

When('I click on the continue, final review button', async function () {
    let postsPage = new PostsPage();
    return await postsPage.clickOnContinueFinalReviewButton(this.driver);
});

When('I click on the publish post, right now button', async function () {
    let postsPage = new PostsPage();
    return await postsPage.clickOnPublishPostRightNowButton(this.driver);
});

When('I click on the back to dashboard post button', async function () {
    let postsPage = new PostsPage();
    return await postsPage.clickOnBackToDashboardPostButton(this.driver);
});

Then('I should see the post {kraken-string}', async function (postTitle) {
    let postsPage = new PostsPage();
    let elements = await postsPage.driver.$$('.gh-content-entry-title');
    let titles = await Promise.all(elements.map(element => element.getText()));
    assert(titles.includes(postTitle));
});

When('I click on the settings button', async function () {
    let postsPage = new PostsPage();
    return await postsPage.clickOnSettingsButton(this.driver);
});

When('I select the Members only option', async function () {
    let postsPage = new PostsPage();
    return await postsPage.selectMembersOnlyOption(this.driver);
});

When('I click the post {kraken-string}', async function (postTitle) {
    let postsPage = new PostsPage();
    return await postsPage.clickOnPost(this.driver, postTitle);
});

Then('I validate on the View post link', async function () {
    let postsPage = new PostsPage();
    return await postsPage.clickOnViewPostLink(this.driver);
});

When('I click on the Posts link back', async function () {
    let postsPage = new PostsPage();
    return await postsPage.clickOnPostsLinkBack(this.driver);
});

When('I click on the Published link', async function () {
    let postsPage = new PostsPage();
    return await postsPage.clickOnPublishedLink(this.driver);
});

Then('I should not see the post {kraken-string}', async function (postTitle) {
    let postsPage = new PostsPage();
    let elements = await postsPage.driver.$$('.gh-content-entry-title');
    let titles = await Promise.all(elements.map(element => element.getText()));
    assert(!titles.includes(postTitle));
});

When('I click on the Draft link', async function () {
    let postsPage = new PostsPage();
    return await postsPage.clickOnDraftLink(this.driver);
});

Then('I should see the post in drafts {kraken-string}', async function (postTitle) {
    let postsPage = new PostsPage();
    let element = await postsPage.driver.$('.gh-content-entry-title');
    let text = await element.getText();
    assert.equal(text, postTitle);
});