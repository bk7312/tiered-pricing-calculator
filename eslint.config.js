import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  }
);

// ## Expanding the ESLint configuration

// If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

// export default tseslint.config({
//   extends: [
//     // Remove ...tseslint.configs.recommended and replace with this
//     ...tseslint.configs.recommendedTypeChecked,
//     // Alternatively, use this for stricter rules
//     ...tseslint.configs.strictTypeChecked,
//     // Optionally, add this for stylistic rules
//     ...tseslint.configs.stylisticTypeChecked,
//   ],
//   languageOptions: {
//     // other options...
//     parserOptions: {
//       project: ['./tsconfig.node.json', './tsconfig.app.json'],
//       tsconfigRootDir: import.meta.dirname,
//     },
//   },
// })

// You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

// // eslint.config.js
// import reactX from 'eslint-plugin-react-x'
// import reactDom from 'eslint-plugin-react-dom'

// export default tseslint.config({
//   plugins: {
//     // Add the react-x and react-dom plugins
//     'react-x': reactX,
//     'react-dom': reactDom,
//   },
//   rules: {
//     // other rules...
//     // Enable its recommended typescript rules
//     ...reactX.configs['recommended-typescript'].rules,
//     ...reactDom.configs.recommended.rules,
//   },
// })
