module.exports = {
    env: {
      browser: true,
      es2020: true,
      node: true,
      'jest/globals': true
    },
    extends: [
      'airbnb',
      'plugin:react/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:jest/recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:import/typescript',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
      'prettier/@typescript-eslint',
      'prettier/react',
    ],
    plugins: [
      '@typescript-eslint',
      'import',
      'jest',
      'jsx-a11y',
      'prefer-arrow',
      'prettier',
      'react',
      'react-hooks',
    ],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
      '__DEV__': true
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2020,
      project: './tsconfig.json',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true
      },
    },
    plugins: [
      '@typescript-eslint',
      'import',
      'jest',
      'jsx-a11y',
      'prefer-arrow',
      'prettier',
      'react',
      'react-hooks',
    ],
    root: true,
    rules: {
      // eslint official
      'newline-before-return': 'error',
      'no-console': 'warn',
      'no-continue': 'off',
      'require-yield': 'error',
      // for react-app-env.d.ts (https://github.com/facebook/create-react-app/issues/6560)
      'spaced-comment': [
        'error',
        'always',
        {
          markers: ['/'],
        },
      ],

      // jsx-a11y
      'jsx-a11y/no-static-element-interactions':'off',
      'jsx-a11y/click-events-have-key-events':'off',
      'jsx-a11y/interactive-supports-focus':'off',

      // @typescript-eslint
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'off',
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        { assertionStyle: 'as', objectLiteralTypeAssertions: 'allow-as-parameter' },
      ],

      // prefer-arrow
      'prefer-arrow/prefer-arrow-functions': [
        'error',
        {
          disallowPrototype: true,
          singleReturnOnly: true,
          classPropertiesAllowed: false,
        }
      ],

      // react
      'react/jsx-filename-extension': [
        'error',
        {
          extensions: ['jsx', 'tsx']
        }
      ],
      'react/jsx-props-no-spreading': [
        'warn',
        {
          custom: 'ignore',
        },
      ],
      'react/prop-types': 'off',
      'react/prefer-stateless-function': 'off',

      // react hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',

      // import
      'import/extensions': [
        'error',
        'always',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never'
        }
      ],
      'import/prefer-default-export': 'off',
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        node: {
          extensions: ['.js', 'jsx', '.ts', '.tsx'],
          paths: ['src'],
        }
      },
      react: {
        version: 'detect'
      }
    },
  };
