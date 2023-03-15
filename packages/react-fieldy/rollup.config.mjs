import typescript from "rollup-plugin-typescript2";
import external from "rollup-plugin-peer-deps-external";
import less from 'rollup-plugin-less';

import pkg from "./package.json" assert { type: "json" };

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
      strict: true,
    },
  ],
  external: [
    "@reduxjs/toolkit", 
    "redux", 
    "@rxdrag/shared", 
    "lodash", 
    "react",
    "react-dom/client",
    "@rxdrag/react-shared"
  ],
  plugins: [
    less({insert:true}),
    // Exclude peer dependencies from the bundle
    external(),
    // Compile TypeScript files
    typescript()
  ],
};
