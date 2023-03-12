import { IDesignerEngine } from "./engine";
export interface IPlugin {
    name: string;
    destory(): void;
}
export type IPluginFactory = (engine: IDesignerEngine) => IPlugin;
