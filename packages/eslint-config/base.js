import js from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";

export const config = [
  js.configs.recommended,
  eslintPluginPrettierRecommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "prettier/prettier": ["error", { singleQuote: true }],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "no-console": ["error"],
    },
  },
  {
    ignores: ["dist/", "src/proto/", "node_modules/", "turbo/", ".next/**"],
  },
];
