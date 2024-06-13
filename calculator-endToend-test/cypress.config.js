const { defineConfig } = require("cypress")

module.exports = defineConfig({
  viewportWidth: 450,
  viewportHeight: 650,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
})
