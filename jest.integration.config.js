module.exports = {
  displayName: "Integration Tests",
  testMatch: [
    "<rootDir>/tests/**/*.test.js"
  ],
  testEnvironment: "node",
  setupFilesAfterEnv: [
    "<rootDir>/tests/setup/testSetup.js"
  ],
  testTimeout: 30000,
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/**/*.test.js",
    "!src/migrations/**",
    "!src/scripts/**"
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
