module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "airbnb",
    "airbnb/hooks",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:node/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  plugins: [
    "@typescript-eslint",
    "node",
    "import",
    "prettier",
    "simple-import-sort",
    "react",
    "react-hooks",
    "jsx-a11y",
  ],
  parserOptions: {
    sourceType: "module",
    project: "./tsconfig.json",
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
  },
  rules: {
    complexity: ["error", 7],
    "no-console": "off",
    "no-else-return": "off",
    "object-shorthand": "error",
    "no-restricted-syntax": "off",
    "no-param-reassign": [
      "error",
      {
        props: true,
        ignorePropertyModificationsFor: ["draft", "state"],
      },
    ],
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: "*",
        next: "return",
      },
    ],
    "no-return-await": "off",

    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
    "no-restricted-imports": ["error", { patterns: ["./", "../"] }],
    "import/prefer-default-export": "off",
    "import/extensions": ["error", "ignorePackages", { ts: "never", tsx: "never" }],
    "@typescript-eslint/consistent-type-imports": "error",

    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/strict-boolean-expressions": "error",
    "@typescript-eslint/array-type": ["error", { default: "generic" }],
    "@typescript-eslint/no-namespace": "error",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "@typescript-eslint/restrict-plus-operands": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: false }],

    "node/no-unsupported-features/es-syntax": "off",
    "node/no-missing-import": "off",

    "prettier/prettier": "error",

    "react/jsx-filename-extension": ["error", { extensions: ["jsx", "tsx"] }],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
  },
}
