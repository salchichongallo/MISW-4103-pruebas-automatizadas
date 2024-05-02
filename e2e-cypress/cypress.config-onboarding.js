const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:2368/ghost',
    specPattern: 'cypress/e2e/1_onboarding.cy.js',
  },
});
