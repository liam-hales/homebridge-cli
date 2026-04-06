/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import-x/no-named-as-default */

import { defineConfig, globalIgnores } from 'eslint/config';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importX from 'eslint-plugin-import-x';

export default defineConfig(
  [
    globalIgnores([
      'dist/',
      '**/*.js',
    ]),
    {
      settings: {
        react: {
          version: '19',
        },
      },
    },
    eslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    stylistic.configs.recommended,
    react.configs.flat.recommended,
    react.configs.flat['jsx-runtime'],
    reactHooks.configs.flat.recommended,
    importX.flatConfigs.recommended,
    importX.flatConfigs.typescript,
    {
      files: ['**/*.{ts,tsx}'],
      languageOptions: {
        parserOptions: {
          projectService: true,
        },
      },
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/prefer-reduce-type-parameter': 'off',
        '@typescript-eslint/no-unnecessary-type-arguments': 'off',
        'react/display-name': 'off',
        'import-x/no-named-as-default-member': 'off',

        // General rules
        'no-console': ['error'],
        'object-shorthand': ['error', 'never'],
        'eqeqeq': [
          'error',
          'always',
          {
            null: 'ignore',
          },
        ],

        // TypeScript rules
        '@typescript-eslint/restrict-template-expressions': [
          'error',
          {
            allow: [
              {
                name: 'unknown',
                from: 'lib',
              },
            ],
            allowNumber: true,
            allowBoolean: true,
            allowNever: true,
            allowAny: false,
            allowArray: false,
            allowNullish: false,
            allowRegExp: false,
          },
        ],
        '@typescript-eslint/no-confusing-void-expression': [
          'error',
          {
            ignoreArrowShorthand: true,
          },
        ],
        '@typescript-eslint/no-misused-promises': [
          'error',
          {
            checksVoidReturn: {
              attributes: false,
            },
          },
        ],
        '@typescript-eslint/strict-boolean-expressions': [
          'error',
          {
            allowString: false,
            allowNumber: false,
            allowNullableObject: false,
          },
        ],
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'default',
            format: ['camelCase'],
            filter: {
              regex: '\\d+',
              match: false,
            },
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
          },
          {
            selector: 'import',
            format: ['camelCase', 'PascalCase'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
          },
          {
            selector: 'variable',
            format: ['camelCase', 'PascalCase'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'forbid',
          },
          {
            selector: 'parameter',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'forbid',
          },
          {
            selector: 'enumMember',
            format: ['UPPER_CASE'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
          },
          {
            selector: ['enum', 'interface', 'typeAlias', 'typeParameter'],
            format: ['PascalCase'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
          },
          {
            selector: 'class',
            format: ['PascalCase'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
          },
          {
            selector: 'classProperty',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'forbid',
          },
        ],
        '@typescript-eslint/no-unnecessary-condition': [
          'error',
          {
            allowConstantLoopConditions: 'only-allowed-literals',
          },
        ],

        // React rules
        'react/function-component-definition': [
          'error',
          {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function',
          },
        ],

        // Stylistic rules
        '@stylistic/semi': ['error', 'always'],
        '@stylistic/arrow-parens': ['error', 'always'],
        '@stylistic/member-delimiter-style': [
          'error',
          {
            singleline: {
              requireLast: true,
            },
          },
        ],
        '@stylistic/operator-linebreak': [
          'error',
          'after',
          {
            overrides: {
              '?': 'before',
              ':': 'before',
              '|': 'before',
            },
          },
        ],
        '@stylistic/object-curly-newline': [
          'error',
          {
            ObjectExpression: {
              multiline: true,
              minProperties: 1,
              consistent: true,
            },
            ExportDeclaration: 'always',
          },
        ],
      },
    },
  ],
);
