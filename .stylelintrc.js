module.exports = {
  plugins: ["stylelint-order"],
  extends: [
    "stylelint-config-standard",
    "stylelint-config-sass-guidelines",
    "stylelint-config-prettier",
  ],
  ignoreFiles: ["public/assets/**/*.css", "coverage/**/*.css"],
  rules: {
    // Allow camelCase and PascalCase class names for CSS modules
    "selector-class-pattern": "^[a-zA-Z][a-zA-Z0-9]*$",

    // Allow named colors
    "color-named": null,

    // Allow border: none and border-bottom: none
    "declaration-property-value-disallowed-list": null,

    // Increase max nesting depth for component styles
    "max-nesting-depth": 3,

    // Allow .scss extensions in imports
    "scss/at-import-partial-extension-blacklist": null,

    // Allow duplicate selectors (common in responsive designs)
    "no-duplicate-selectors": null,
  },
};
