/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "./index.js",
    "next/core-web-vitals",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  plugins: ["react", "react-hooks", "jsx-a11y"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "jsx-a11y/anchor-is-valid": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
