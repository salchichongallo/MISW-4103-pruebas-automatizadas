const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://ec2-54-158-234-189.compute-1.amazonaws.com:2368',
    specPattern: 'cypress/e2e/1_onboarding.cy.js',
  },
});
