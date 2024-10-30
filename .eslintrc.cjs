/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
  ],
  rules: {
    "@typescript-eslint/array-type": "off", // Disable enforcing array types
    "@typescript-eslint/consistent-type-definitions": "off", // Disable enforcing type definitions
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_", // Allow unused variables starting with "_"
        varsIgnorePattern: "^_", // Allow unused variables starting with "_"
      },
    ],
    "@typescript-eslint/require-await": "off", // Disable requiring async functions to have await
    "@typescript-eslint/no-misused-promises": [
      "warn", // Change from error to warn
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
    "@typescript-eslint/no-unsafe-assignment": "off", // Allow unsafe assignments
    "@typescript-eslint/no-unnecessary-type-assertion": "off", // Allow unnecessary type assertions
    "@typescript-eslint/prefer-nullish-coalescing": "off", // Allow using || instead of ?? for nullish checks
  },
  ignorePatterns: ["lib/**/*.d.ts"], // Ignore .d.ts files from linting
};

module.exports = config;
