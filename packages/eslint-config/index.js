/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import"],
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      { prefer: "type-imports", fixStyle: "separate-type-imports" },
    ],
    "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
  },
  ignorePatterns: [
    "**/*.config.js",
    "**/*.config.cjs",
    "**/*.config.mjs",
    ".eslintrc.cjs",
    "dist/",
    "node_modules/",
  ],
  reportUnusedDisableDirectives: true,
};
