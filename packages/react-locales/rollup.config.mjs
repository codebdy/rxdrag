import typescript from "rollup-plugin-typescript2";
import external from "rollup-plugin-peer-deps-external";

import pkg from "./package.json" assert { type: "json" };

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
      strict: false,
    },
  ],
  external: [
    "lodash", 
    "react",
  ],
  plugins: [
    // Exclude peer dependencies from the bundle
    external(),
    // Compile TypeScript files
    typescript()
  ],
};
