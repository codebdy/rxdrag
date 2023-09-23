import { INodeSchema } from "@rxdrag/schema";
import { DeviceType } from "./device";
import { ICanvasConfig } from "@rxdrag/react-core";
import { IModuleCategory } from "./module";
import { IMenu } from "./menu";
import { ILogicFlowDefine } from "@rxdrag/minions-schema"
import { IScriptDefine } from "./script";

export interface IApp {
  id: string,
  title?: string,
}

export interface IAppInput {
  id?: string,
  title?: string,
  fxFlows?: ILogicFlowDefine[],
  fxScripts?: IScriptDefine[],
}

export interface IAppFrontend {
  app?: IApp,
  deviceType: DeviceType,
  frameSchema?: INodeSchema,
  canvasConfig?: ICanvasConfig,
  menus?: IMenu[],
  moduleCategories?: IModuleCategory[],
  fxFlows?: ILogicFlowDefine[],
  fxScripts?: IScriptDefine[],
}