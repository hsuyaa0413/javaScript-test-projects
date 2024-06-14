const { defineConfig } = require("cypress")

module.exports = defineConfig({
  viewportWidth: 900,
  viewportHeight: 900,
  e2e: {
    baseUrl: "http://localhost:1234"
  }
})
