import { defineConfig, globalIgnores } from 'eslint/config';
import customConfig from 'eslint-config-phun-ky';
import globals from 'globals';

export default defineConfig([
  // Build output
  globalIgnores(['dist/**']),
  {
    extends: [customConfig],
    rules: {
      // Prettier uses double quotes when that avoids escaping a single quote;
      // without `avoidEscape` the two disagree and `--fix` loops.
      // https://github.com/phun-ky/eslint-config/issues/92
      '@stylistic/quotes': ['warn', 'single', { avoidEscape: true }]
    }
  },
  {
    // Posts start with YAML front matter
    files: ['**/*.md'],
    languageOptions: {
      frontmatter: 'yaml'
    }
  },
  {
    // The build and the checks run in Node, not in the browsers in
    // .browserslistrc
    files: ['scripts/**/*.js', 'scripts/**/*.mjs', 'src/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    },
    rules: {
      'compat/compat': 'off'
    }
  },
  {
    // Command-line scripts report to the terminal
    files: ['scripts/**/*.js', 'scripts/**/*.mjs'],
    rules: {
      'no-console': 'off'
    }
  }
]);
