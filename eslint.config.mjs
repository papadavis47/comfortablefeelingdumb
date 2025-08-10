// ESLint v9 flat config format
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Apply to all files first
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      ".pnpm-store/**",
      "posts/**/*.mdx"  // Skip MDX files for now - they need special parsing
    ]
  },

  // Next.js recommended configuration for JS/TS/JSX/TSX files
  ...compat.extends("next/core-web-vitals"),
  
  // TypeScript-specific configuration
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      "@typescript-eslint": typescriptEslint
    },
    rules: {
      // TypeScript-specific rules
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ],
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        {
          assertionStyle: "as",
          objectLiteralTypeAssertions: "never"
        }
      ],
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports"
        }
      ]
    }
  },
  
  // Configuration files
  {
    files: ["**/*.config.js", "**/*.config.mjs", "eslint.config.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: "readonly",
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly"
      }
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "import/no-anonymous-default-export": "off"  // Allow default exports in config files
    }
  }
];

export default eslintConfig;