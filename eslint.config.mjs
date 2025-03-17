import { defineConfig } from 'eslint/config';
import prettier from "eslint-plugin-prettier/recommended";
import globals from "globals";

export default defineConfig([
  {
    plugins: {
      prettier,
    },
    rules: {
      'max-len': ['error', 80],
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.jest,
        __basedir: 'readonly',
      }
    },
  },
]);
