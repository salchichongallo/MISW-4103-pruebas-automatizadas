const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:2368/ghost',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
