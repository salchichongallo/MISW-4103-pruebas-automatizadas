const path = require('path');
const crypto = require('crypto');
const fs = require('fs/promises');
const { After, Before, BeforeStep, AfterStep } = require('@cucumber/cucumber');
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

BeforeStep(async function () {
  await new Promise(resolve => setTimeout(resolve, 1_000));
});

After(async function () {
  // Wait until scenario reports are generated
  await new Promise(resolve => setTimeout(resolve, 5000));
  await this.deviceClient.stopKrakenForUserId(this.userId);
});

const steps = {};
let stepIndex = 0;
AfterStep(async function ({ pickle, gherkinDocument }) {
  const basePath = path.join(process.cwd(), 'reports', 'steps');
  const imagesPath = path.join(basePath, 'screenshots');

  await fs.mkdir(imagesPath, { recursive: true });

  const fileId = crypto.randomUUID();
  const imagePath = path.join(imagesPath, `${fileId}.png`);
  await this.driver.saveScreenshot(imagePath);

  const scenario = pickle.name;
  const step = {
    name: pickle.steps[stepIndex].text,
    feature: gherkinDocument.feature.name,
    image: imagePath,
  };
  if (!steps[scenario]) {
    steps[scenario] = [];
  }
  steps[scenario].push(step);

  stepIndex += 1;
});

After(async function () {
  const fileId = crypto.randomUUID();
  const basePath = path.join(process.cwd(), 'reports', 'steps');
  const filename = path.join(basePath, `${fileId}.json`);
  const content = JSON.stringify(steps, null, 2);
  await fs.writeFile(filename, content);
});
