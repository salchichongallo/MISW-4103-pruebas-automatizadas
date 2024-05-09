require('dotenv').config();
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.GHOST_BASE_URL_3429 || 'http://localhost:2368',
    specPattern: 'cypress/e2e/test_3.42.9/*.cy.js',
    viewportWidth: 1200,
    viewportHeight: 900,
  },
});
