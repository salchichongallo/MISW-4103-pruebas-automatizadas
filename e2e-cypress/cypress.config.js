require('dotenv').config();
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.GHOST_BASE_URL || 'http://localhost:2368',
    excludeSpecPattern: 'cypress/e2e/1_onboarding.cy.js',
    viewportWidth: 1200,
    viewportHeight: 900,
  },
});
