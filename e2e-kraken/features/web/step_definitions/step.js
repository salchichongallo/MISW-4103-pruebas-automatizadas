const { Given, When, Then } = require('@cucumber/cucumber');

When('I visit the admin panel', async function () {
  return await this.driver.url('http://localhost:2368/ghost');
});
