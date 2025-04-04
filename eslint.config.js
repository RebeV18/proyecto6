import js from "@eslint/js";

export default [
  js.configs.recommended,

  {
    files: ["**/*.js"],
    ignores: ["node_modules", "dist", "public", "eslint.config.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        process: "readonly",
        __dirname: "readonly",
        console: "readonly",
      },
    },
    rules: {
      indent: ["error", 2],
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-undef": "error",
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "no-console": "off",
    },
  },
];
