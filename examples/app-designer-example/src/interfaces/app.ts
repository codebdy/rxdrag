import { INodeSchema } from "@rxdrag/schema";
import { DeviceType } from "./device";
import { ICanvasConfig } from "@rxdrag/react-core";
import { IModuleCategory } from "./module";
import { IMenu } from "./menu";
import { IScopedScript } from "./script";
import { IScopedILogicFlow } from "./flow";

export interface IApp {
  id: string,
  title?: string,
}

export interface IAppInput {
  id?: string,
  title?: string,
  fxFlows?: IScopedILogicFlow[],
  fxScripts?: IScopedScript[],
}

export interface IAppFrontend {
  app?: IApp,
  deviceType: DeviceType,
  frameSchema?: INodeSchema,
  canvasConfig?: ICanvasConfig,
  menus?: IMenu[],
  moduleCategories?: IModuleCategory[],
  fxFlows?: IScopedILogicFlow[],
  fxScripts?: IScopedScript[],
}