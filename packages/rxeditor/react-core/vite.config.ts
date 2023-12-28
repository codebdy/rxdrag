import { definePackageConfig } from '../../../internal';

export default definePackageConfig(
  {
    overrides:{
      optimizeDeps: {
        exclude: [
          // 在这里列出应该被视为外部依赖的模块
          // '@rxdrag/core',
          // '@rxdrag/locales',
          // '@rxdrag/react-locales',
          // '@rxdrag/react-runner',
          // '@rxdrag/react-shared',
          // '@rxdrag/schema',
          // '@rxdrag/shared',
          // '@rxdrag/react-fieldy',
          // '@rxdrag/minions-schema',
          // '@rxdrag/minions-runtime-react',
          // '@rxdrag/minions-logicflow-editor',
        ],
      },
    }
  }
) as any;
