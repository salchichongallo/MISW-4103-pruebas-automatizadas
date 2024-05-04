const { After, Before } = require('@cucumber/cucumber');
const { WebClient } = require('kraken-node');

Before(async function () {
  this.deviceClient = new WebClient(
    'chrome',
    {
      'goog:chromeOptions': {
        args: process.env.CI ? ['headless', 'disable-gpu'] : [],
      },
    },
    this.userId,
  );
  this.driver = await this.deviceClient.startKrakenForUserId(this.userId);
});

After(async function () {
  // Wait until scenario reports are generated
  await new Promise(resolve => setTimeout(resolve, 5000));
  await this.deviceClient.stopKrakenForUserId(this.userId);
});
