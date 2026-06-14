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
			'react-refresh': reactRefresh, // ✅ так работает в 0.4.x
			prettier: prettierPlugin
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
			'prettier/prettier': [
				'error',
				{
					singleQuote: true,
					trailingComma: 'none',
					printWidth: 200,
					useTabs: true
				}
			]
		}
	}
);
