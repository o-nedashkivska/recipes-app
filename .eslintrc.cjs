/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/recommended",
    "eslint:recommended",
    "@vue/eslint-config-prettier",
    "@vue/eslint-config-typescript",
  ],
  rules: {
    "prettier/prettier": "off",
  },
};
