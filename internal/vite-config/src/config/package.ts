import { readPackageJSON } from 'pkg-types';
import { defineConfig, mergeConfig, type UserConfig } from 'vite';
import dts from 'vite-plugin-dts';

interface DefineOptions {
  overrides?: UserConfig;
  options?: {
    //
  };
}

function definePackageConfig(defineOptions: DefineOptions = {}) {
  const { overrides = {} } = defineOptions;
  const root = process.cwd();
  return defineConfig(async () => {
    const { dependencies = {}, peerDependencies = {} } = await readPackageJSON(
      root
    );
    const packageConfig: UserConfig = {
      build: {
        sourcemap: true,
        minify: false,
        lib: {
          entry: 'src/index.ts',
          formats: ['es'],
          fileName: () => 'index.mjs'
        },
        rollupOptions: {
          external: [
            ...Object.keys(dependencies),
            ...Object.keys(peerDependencies)
          ]
        }
      },
      plugins: [
        dts({
          entryRoot: 'src',
          logLevel: 'error'
        })
        // configVisualizerConfig(),
      ]
    };

    return mergeConfig(packageConfig, overrides);
  });
}

export { definePackageConfig };
