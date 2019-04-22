module.exports = {
    env: {
        'browser': true,
        'es6': true
    },
    parser: 'babel-eslint',
    extends: [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    ecmaFeatures: {
        jsx: true,
        modules: true,
        destructuring: true,
        classes: true,
        forOf: true,
        blockBindings: true,
        arrowFunctions: true,
    },
    plugins: [
        'react',
        'jsx-a11y',
        'import'
    ],
    rules: {
        'prefer-const': 0,
        'arrow-body-style': 0,
        'no-nested-ternary': 0,
        'newline-per-chained-call': 0,
        'arrow-parens': 0,
        'class-methods-use-this': 0,
        'func-names': 0,
        'prefer-destructuring': 0,
        'new-cap': 0,
        'padded-blocks': 0,
        'no-plusplus': 0,
        'no-return-assign': 0,
        'no-param-reassign': 0,
        'no-confusing-arrow': 0,
        'no-restricted-globals': 0,
        'no-alert': 0,
        'no-underscore-dangle': 0,
        'quote-props': 0,
        'one-var-declaration-per-line': ['error', 'initializations'],
        'one-var': ['error', { initialized: 'never' }],
        'indent': [
            2,
            2,
            {
                'SwitchCase': 1,
            }
        ],
        'template-curly-spacing': [2, 'always'],
        'jsx-quotes': [2, 'prefer-single'],
        'object-curly-spacing': ['error', 'always'],
        'no-extra-semi': 'error',
        'semi': ['error', 'always'],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ]
    }
};
