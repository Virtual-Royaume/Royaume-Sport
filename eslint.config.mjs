import { eslintConfig } from "@bluzzi/eslint-config";
import { globalIgnores } from "eslint/config";

export default eslintConfig(
  {
    typescript: { tsconfigPath: "./tsconfig.json" },
  },
  {
    ignores: globalIgnores(["ui/**/*"], "Ignore UI directory"),
  },
);
