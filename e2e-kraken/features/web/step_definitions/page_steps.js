const { expect } = require('chai');
const { Given, When, Then } = require('@cucumber/cucumber');
const PagesPage = require('../page-objects/pages-page');
const PageForm = require('../page-objects/page-form');

let title;

When('I navigate to page section', PagesPage.prototype.visit);

When('I click on new page', PagesPage.prototype.newPage);

When('I set the page title to {kraken-string}', async function (pageTitle) {
  title = pageTitle;
  const page = new PageForm(this);
  await page.setTitle(pageTitle);
});

When('I set the page content', async function () {
  const page = new PageForm(this);
  await page.setContent();
});

When('I set the page image', async function () {
  const page = new PageForm(this);
  await page.setImage();
});

When('I set the page access to "members paid"', async function () {
  const page = new PageForm(this);
  await page.setAccess();
});

When('I create the page', PageForm.prototype.clickSave);

When('I confirm the publication', PageForm.prototype.clickConfirmPublication);

When('I confirm the publish', PageForm.prototype.confirmPublish);

Then('I navigate to pages section and see the title', async function () {
  const page = new PagesPage(this);
  await page.visit();
  const pages = await page.getPages();
  expect(pages).to.includes(title);
});


When('I return to the pages list', async function () {
  const page = new PagesPage(this);
  await page.goBack();
});

Then('I should see the page title with draft flag', async function () {
  const page = new PagesPage(this);
  const pages = await page.getDraftPages();
  expect(pages).to.includes(title);
});
