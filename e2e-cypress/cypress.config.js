require('dotenv').config();
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.GHOST_BASE_URL || 'http://ec2-54-158-234-189.compute-1.amazonaws.com:2368',
    excludeSpecPattern: 'cypress/e2e/1_onboarding.cy.js',
  },
});
