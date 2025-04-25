import { eslintConfig } from "@bluzzi/eslint-config";

export default eslintConfig(
  {
    typescript: { tsconfigPath: "./tsconfig.json" },
  },
  {
    files: ["**/actions/**/*"],
    rules: {
      "@typescript-eslint/require-await": "off",
    },
  },
  {
    ignores: ["**/ui/**/*"],
  },
);
