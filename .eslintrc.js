module.exports = {
  env: {
    "browser": true,
    "es6": true
  },
  parser: "babel-eslint",
  extends: "eslint:recommended",
  ecmaFeatures: {
    jsx: true,
    modules: true,
    destructuring: true,
    classes: true,
    forOf: true,
    blockBindings: true,
    arrowFunctions: true,
  },
  rules: {
    "indent": [2, 4],
    "template-curly-spacing": [2, "always"],
    "jsx-quotes": [2, "prefer-single"],
    "no-extra-semi": "error",
    "one-var": ["error", { initialized: "never" }],
    "semi": ["error", "always"],
      "linebreak-style": [
          "error",
          "unix"
      ],
      "quotes": [
          "error",
          "single"
      ]
  }
};