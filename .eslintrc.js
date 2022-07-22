/** Для запрета приватных путей */
const DENIED_PATH_GROUPS = [
  // Private imports are prohibited, use public imports instead
  'app/**',
  'pages/**',
  'features/**',
  'shared/*/**',
  'models.gen',
  // Prefer absolute imports instead of relatives (for root modules)
  '../**/app',
  '../**/pages',
  '../**/features',
  '../**/shared',
  '../**/models',
];

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  root: true,
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    /* "prettier", */

    /* "plugin:prettier/recommended", */
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      js: true,
      tsx: true,
      ts: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    /* 'project': './tsconfig.json', */
  },
  plugins: ['react', '@typescript-eslint', 'import'],
  rules: {
    'no-alert': 'off',
    'no-shadow': 'off',
    'no-param-reassign': ['error', { props: false }],
    '@typescript-eslint/no-explicit-any': 'off',
    'react/require-default-props': 'off',
    'react/prop-types': 'off',
    indent: ['error', 2, { SwitchCase: 1 }],
    'import/first': 2,
    'linebreak-style': ['error', 'unix'],
    'import/no-unresolved': 0,
    'object-shorthand': 2,
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-console': 0,
    // 'no-restricted-imports': [2, { patterns: DENIED_PATH_GROUPS }],
    'jsx-a11y/label-has-associated-control': ['error', {
      required: {
        some: ['nesting', 'id'],
      },
    }],
    'jsx-a11y/label-has-for': ['error', {
      required: {
        some: ['nesting', 'id'],
      },
    }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    /* "no-var": 2, */
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        moduleDirectory: ['node_modules', 'src/'],
      },
      alias: {
        map: [['@app', './src']],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    },
  },
  globals: {
    NodeJS: true,
    JSX: true,
    RequestInit: true,
  },

};
