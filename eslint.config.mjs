//  @ts-check
import { defineConfig } from 'eslint/config'
import { tanstackConfig } from '@tanstack/eslint-config'
import tseslint from 'typescript-eslint'
import pluginRouter from '@tanstack/eslint-plugin-router'
import prettierConfig from 'eslint-config-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import panda from '@pandacss/eslint-plugin'

export default defineConfig([
  ...tanstackConfig,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  tseslint.configs.strictTypeChecked,
  pluginRouter.configs['flat/recommended'],
  {
    plugins: { '@pandacss': panda },
    rules: { ...panda.configs.recommended.rules },
  },
  reactHooks.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    rules: {
      'import/no-cycle': 'off',
      'import/order': 'off',
      'sort-imports': 'off',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/require-await': 'off',
      'pnpm/json-enforce-catalog': 'off',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/only-throw-error': [
        'error',
        {
          allow: [
            {
              from: 'package',
              package: '@tanstack/router-core',
              name: 'NotFoundError',
            },
          ],
        },
      ],
    },
  },
  {
    ignores: [
      'dist',
      '.output',
      '.wrangler',
      'styled-system',
      '.content-collections',
      'src/routeTree.gen.ts',
      'eslint.config.mjs',
      'prettier.config.js',
      'postcss.config.cjs',
    ],
  },
  prettierConfig,
])
