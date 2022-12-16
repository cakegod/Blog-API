import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: '3xpybr',
  e2e: {
    specPattern: 'cypress/e2e/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
