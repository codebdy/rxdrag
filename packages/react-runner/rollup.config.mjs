import typescript from "rollup-plugin-typescript2";
import external from "rollup-plugin-peer-deps-external";
import less from "rollup-plugin-less";

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
    "@reduxjs/toolkit",
    "redux",
    "lodash",
    "react",
    "@monaco-editor/react",
    "react-dom/client",
    "styled-components",
    "@rxdrag/react-fieldy",
    "@rxdrag/shared",
    "@rxdrag/core",
    "@rxdrag/react-shared",
    "@rxdrag/fieldy",
    "@rxdrag/react-minions",
    "@rxdrag/minions",
    "react-router-dom",
  ],
  plugins: [
    less({ insert: true }),
    // Exclude peer dependencies from the bundle
    external(),
    // Compile TypeScript files
    typescript(),
  ],
};
