const { Given } = require('@cucumber/cucumber');

const LoginPage = require('../page-objects/login-page');
const DashboardPage = require('../page-objects/dashboard-page');

Given('The login page', async function () {
  const loginPage = new LoginPage(this);
  await loginPage.visit();
});

Given(
  'I sign-in with {kraken-string} and {kraken-string}',
  async function (email, password) {
    const loginPage = new LoginPage(this);
    await loginPage.setEmail(email);
    await loginPage.setPassword(password);
    await loginPage.submit();
  },
);

Given('I wait for the dashboard', DashboardPage.prototype.waitFor);

Given('I go back to dashboard', DashboardPage.prototype.visit);
