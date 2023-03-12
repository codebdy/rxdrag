import { IDesignerEngine } from './interfaces';
import { IPluginFactory } from './interfaces/plugin';
export declare function createEngine(plugins: IPluginFactory[], options?: {
    languange?: string;
    debugMode: boolean;
}): IDesignerEngine;
