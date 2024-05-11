const GhostPage = require('./ghost-page');
const PostForm = require('./post-form');

class PostsPage extends GhostPage {
  async visit() {
    const url = new URL(await this.driver.getUrl());
    url.pathname = '/ghost';
    url.hash = '#/posts';
    await this.driver.url(url.toString());
    await this.driver.refresh();
    await new Promise(resolve => setTimeout(resolve, 5_000));
    await this.driver.$('h2=Posts').waitForDisplayed({ timeout: 30_000 });
  }

  async newPost() {
    const link = await this.driver.$('[data-test-new-post-button]');
    await link.click();
    return new PostForm(this);
  }

  async clickOnPostButton(driver) {
    let element = await driver.$('[data-test-nav="posts"]');
    return await element.click();
  }

  async clickOnNewPostButton(driver) {
    let element = await driver.$('[data-test-new-post-button]');
    return await element.click();
  }

  async enterTitle(driver, title) {
    let element = await driver.$('[data-test-editor-title-input]');
    return await element.setValue(title);
  }

  async clickOnDroppableParagraph(driver) {
    let element = await driver.$('p[data-koenig-dnd-droppable="true"]');
    return await element.click();
  }

  async clickOnPublishButton(driver) {
    let element = await driver.$('[data-test-button="publish-flow"]');
    return await element.click();
  }

  async clickOnContinueFinalReviewButton(driver) {
    let element = await driver.$('[data-test-button="continue"]');
    return await element.click();
  }

  async clickOnPublishPostRightNowButton(driver) {
    let element = await driver.$('[data-test-button="confirm-publish"]');
    return await element.click();
  }

  async clickOnBackToDashboardPostButton(driver) {
    let element = await driver.$('.gh-back-to-editor');
    return await element.click();
  }

  async clickOnSettingsButton(driver) {
    let element = await driver.$('[data-test-psm-trigger]');
    return await element.click();
  }

  async selectMembersOnlyOption(driver) {
    let dropdown = await driver.$('[data-test-select="post-visibility"]');
    await dropdown.click();

    let option = await driver.$('option[value="members"]');
    return await option.click();
  }

  async clickOnPost(driver, postTitle) {
    let element = await driver.$(`.gh-content-entry-title=${postTitle}`);
    return await element.click();
  }

  async clickOnViewPostLink(driver) {
    let element = await driver.$('a.post-view-link=View post');
    return await element.click();
  }

  async clickOnPostsLinkBack(driver) {
    let element = await driver.$('a[data-test-link="posts"]');
    return await element.click();
  }

  async clickOnPublishedLink(driver) {
    let element = await driver.$('a[data-test-nav-custom="posts-Published"]');
    return await element.click();
  }

  async clickOnDraftLink(driver) {
    let element = await driver.$('a[data-test-nav-custom="posts-Drafts"]');
    return await element.click();
  }
}

module.exports = PostsPage;
