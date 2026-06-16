import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh'; // default import
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';

export default tseslint.config(
	{
		ignores: ['dist', 'node_modules']
	},
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			prettier: prettierPlugin,
			'@typescript-eslint': tseslint.plugin
		},
		languageOptions: {
			globals: globals.browser
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'no-console': 'warn',
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true } // Vite поддерживает это
			],
			'typescript-eslint/no-explicit-any': 'warn',
			'prettier/prettier': [
				'error',
				{
					endOfLine: 'auto',
					singleQuote: true,
					trailingComma: 'none',
					printWidth: 200,
					useTabs: true
				}
			]
		}
	}
);
