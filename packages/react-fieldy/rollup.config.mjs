import typescript from "rollup-plugin-typescript2";

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
    "@rxdrag/shared",
    "lodash",
    "@rxdrag/fieldy",
    "react",
  ],
  plugins: [typescript()],
};
