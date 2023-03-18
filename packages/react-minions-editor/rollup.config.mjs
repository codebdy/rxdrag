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
    "@rxdrag/shared",
    "@reduxjs/toolkit",
    "react",
    "styled-components",
    "@ant-design/icons",
    "@rxdrag/react-core",
    "@rxdrag/react-shared",
    "@rxdrag/react-locales",
    "@rxdrag/react-props-inputs",
    "@rxdrag/react-minions",
    "@rxdrag/schema",
    "@rxdrag/react-fieldy",
    "@rxdrag/react-runner",
    "@antv/x6",
    "antd",
    "uuid",
    "insert-css",
    "@antv/x6-react-shape",
    "@antv/x6-plugin-selection",
    "@antv/x6-plugin-dnd",
    "@antv/x6-plugin-minimap",
    "antd/es/theme/internal"

  ],
  plugins: [
    less(),
    // Exclude peer dependencies from the bundle
    external(),
    // Compile TypeScript files
    typescript(),
  ],
};
