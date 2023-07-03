import { type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';

import { configVisualizerConfig } from './visualizer';

interface Options {
  isBuild: boolean;
  root: string;
  compress: string;
  enableMock?: boolean;
  enableAnalyze?: boolean;
}

async function createPlugins({ isBuild, root, enableMock, compress, enableAnalyze }: Options) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [react()];

  if (enableAnalyze) {
    vitePlugins.push(configVisualizerConfig());
  }
  return vitePlugins;
}

export { createPlugins };
