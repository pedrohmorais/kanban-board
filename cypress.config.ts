import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      config.env = {
        ...config.env,
        CYPRESS_TS_CHECK: false,
      }
      return config
    },
  },
})
