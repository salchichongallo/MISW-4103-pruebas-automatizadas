require('dotenv').config();
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  chromeWebSecurity: false,
  e2e: {
    baseUrl: process.env.GHOST_BASE_URL || 'http://localhost:2368',
    defaultCommandTimeout: 15_000,
    excludeSpecPattern: [
      'cypress/e2e/1_onboarding.cy.js',
      'cypress/e2e/test_3.42.9/*',
    ],
    viewportWidth: 1200,
    viewportHeight: 900,
    screenshotsFolder: 'cypress/screenshots/ghost5822',
  },
});
