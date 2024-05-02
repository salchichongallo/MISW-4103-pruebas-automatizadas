const { Given, When, Then } = require('@cucumber/cucumber');

// Login
When('I visit the admin panel', async function () {
  return await this.driver.url('http://localhost:2368/ghost');
});

When(
  'I login in as admin with {kraken-string} and {kraken-string}',
  async function (email, password) {
    const emailInput = await this.driver.$('#identification');
    await emailInput.setValue(email);

    const passwordInput = await this.driver.$('#password');
    await passwordInput.setValue(password);

    const submit = await this.driver.$('[data-test-button="sign-in"]');
    await submit.click();
  },
);



