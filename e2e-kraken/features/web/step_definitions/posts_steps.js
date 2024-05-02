const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

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

Then('I should see the post {kraken-string}', async function (postTitle) {
    let elements = await this.driver.$$('.gh-content-entry-title');
    let titles = await Promise.all(elements.map(element => element.getText()));
    assert(titles.includes(postTitle));
});

//Case 11

When('I click on the settings button', async function () {
    let element = await this.driver.$('[data-test-psm-trigger]');
    return await element.click();
});

When('I select the Members only option', async function () {
    let dropdown = await this.driver.$('[data-test-select="post-visibility"]');
    await dropdown.click();

    let option = await this.driver.$('option[value="members"]');
    return await option.click();
});

When('I click the post {kraken-string}', async function (postTitle) {
    let element = await this.driver.$(`.gh-content-entry-title=${postTitle}`);
    await element.click();
});

When('I click on the View post link', async function () {
    let element = await this.driver.$('a.post-view-link=View post');
    return await element.click();
});

//Case 10

When('I click on the Posts link back', async function () {
    let element = await this.driver.$('a[data-test-link="posts"]');
    return await element.click();
});

When('I click on the Published link', async function () {
    let element = await this.driver.$('a[data-test-nav-custom="posts-Published"]');
    return await element.click();
});

Then('I should not see the post {kraken-string}', async function (postTitle) {
    let elements = await this.driver.$$('.gh-content-entry-title');
    let titles = await Promise.all(elements.map(element => element.getText()));
    assert(!titles.includes(postTitle));
});

//Case 9

When('I click on the Draft link', async function () {
    let element = await this.driver.$('a[data-test-nav-custom="posts-Drafts"]');
    return await element.click();
});

Then('I should see the post in drafts {kraken-string}', async function (postTitle) {
    let element = await this.driver.$('.gh-content-entry-title');
    let text = await element.getText();
    assert.equal(text, postTitle);
});