module.exports = {
  "extends": "airbnb",
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "parser": "babel-eslint",
  "settings": {
    "ecmascript": 6
  },

  "ecmaFeatures": {
    "jsx": true,
    "modules": true,
    "destructuring": true,
    "classes": true,
    "forOf": true,
    "blockBindings": true,
    "arrowFunctions": true,
  },

  "env": {
    "browser": true
  },

  "rules": {
    "arrow-body-style": 0,
    "no-nested-ternary": 0,
    'newline-per-chained-call': 0,
    "arrow-parens": 0,
    "class-methods-use-this": 0,
    "func-names": 0,
    "new-cap": 0,
    "no-plusplus": 0,
    "no-return-assign": 0,
    "no-param-reassign": 0,
    "no-confusing-arrow": 0,
    "no-underscore-dangle": 0,
    "quote-props": 0,
    "one-var-declaration-per-line": ["error", "initializations"],
    "one-var": ["error", { initialized: "never" }],
    "indent": [2, 2],
    "template-curly-spacing": [2, "always"],
    "comma-dangle": [
      "error", {
        "arrays": "always-multiline",
        "objects": "always-multiline",
        "imports": "always-multiline",
        "exports": "always-multiline",
        "functions": "never"
      }],
    "jsx-quotes": [2, "prefer-single"],
    "object-curly-spacing": ["error", "never"],
    "react/sort-comp": 0,
    "react/no-unused-prop-types": 1,
    "react/forbid-prop-types": 0,
    "react/jsx-curly-spacing": ["error", "never"],
    "react/jsx-first-prop-new-line": ["error", "never"],
    "react/jsx-filename-extension": 0,
    "react/jsx-boolean-value": 0,
    "react/jsx-no-bind": 0,
    "react/jsx-closing-bracket-location": [1, 'after-props'],
    "react/prefer-stateless-function": 0,
    "import/extensions": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-unresolved": 0,
    "import/prefer-default-export": 0,
    "react/no-unknown-property": [2, {"ignore": ["class", "for"]}],
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/anchor-has-content": 0
  }
}