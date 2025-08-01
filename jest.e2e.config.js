module.exports = {
  displayName: "End-to-End Tests",
  testMatch: [
    "<rootDir>/tests/e2e/**/*.test.js"
  ],
  testEnvironment: "node",
  setupFilesAfterEnv: [
    "<rootDir>/tests/setup/e2eSetup.js"
  ],
  testTimeout: 60000,
  maxWorkers: 1,
  globalSetup: "<rootDir>/tests/setup/globalSetup.js",
  globalTeardown: "<rootDir>/tests/setup/globalTeardown.js"
};
