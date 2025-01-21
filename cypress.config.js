const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://www.testograf.ru/ru/blog/feedback-form-template',
    video: true,
    videosFolder: 'cypress/videos',
    chromeWebSecurity: false,
  },
});
