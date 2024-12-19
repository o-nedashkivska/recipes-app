/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");
const vueTsEslintConfig = require("@vue/eslint-config-typescript");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/recommended",
    "eslint:recommended",
    "@vue/eslint-config-prettier",
    ...vueTsEslintConfig(),
  ],
  rules: {
    "prettier/prettier": "off",
  },
};
