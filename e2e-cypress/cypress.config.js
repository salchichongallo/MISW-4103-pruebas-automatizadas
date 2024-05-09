require('dotenv').config();
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.GHOST_BASE_URL || 'http://localhost:2368',
    excludeSpecPattern: 'cypress/e2e/1_onboarding.cy.js',
    viewportWidth: 1200,
    viewportHeight: 900,
    setupNodeEvents(on) {
      on('after:screenshot', ({ path: imagePath }) => {
        const name = imagePath.split('/').at(-1).split('.png')[0];
        const [, , stepName] = name.split('---');
        const step = {
          name: stepName,
          image: imagePath,
        };
      });
    },
  },
});
