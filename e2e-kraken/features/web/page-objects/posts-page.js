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

  async clickOnPostButton() {
    const element = await this.driver.$('[data-test-nav="posts"]');
    await element.click();
  }

  async clickOnNewPostButton() {
    const element = await this.driver.$('[data-test-new-post-button]');
    await element.click();
  }

  async enterTitle(title) {
    const element = await this.driver.$('[data-test-editor-title-input]');
    await element.setValue(title);
  }

  async clickOnDroppableParagraph() {
    const element = await this.driver.$('p[data-koenig-dnd-droppable="true"]');
    await element.click();
  }

  async clickOnPublishButton() {
    const element = await this.driver.$('[data-test-button="publish-flow"]');
    await element.click();
  }

  async clickOnContinueFinalReviewButton() {
    const element = await this.driver.$('[data-test-button="continue"]');
    await element.click();
  }

  async clickOnPublishPostRightNowButton() {
    const element = await this.driver.$('[data-test-button="confirm-publish"]');
    await element.click();
  }

  async clickOnBackToDashboardPostButton() {
    const element = await this.driver.$('.gh-back-to-editor');
    await element.click();
  }

  async clickOnSettingsButton() {
    const element = await this.driver.$('[data-test-psm-trigger]');
    await element.click();
  }

  async selectMembersOnlyOption() {
    const dropdown = await this.driver.$('[data-test-select="post-visibility"]');
    await dropdown.click();

    const option = await this.driver.$('option[value="members"]');
    await option.click();
  }

  async clickOnPost(postTitle) {
    const element = await this.driver.$(`.gh-content-entry-title=${postTitle}`);
    await element.click();
  }

  async clickOnViewPostLink() {
    const element = await this.driver.$('a.post-view-link=View post');
    await element.click();
  }

  async clickOnPostsLinkBack() {
    const element = await this.driver.$('a[data-test-link="posts"]');
    await element.click();
  }

  async clickOnPublishedLink() {
    const element = await this.driver.$('a[data-test-nav-custom="posts-Published"]');
    await element.click();
  }

  async clickOnDraftLink() {
    const element = await this.driver.$('a[data-test-nav-custom="posts-Drafts"]');
    await element.click();
  }
}

module.exports = PostsPage;
