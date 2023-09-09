import { INodeSchema } from "@rxdrag/schema";
import { DeviceType } from "./device";
import { ICanvasConfig } from "@rxdrag/react-core";

export interface IApp {
  id: string,
  title?: string,
}

export interface IAppInput{
  id?: string,
  title?: string,
}

export interface IAppFrontend {
  app?: IApp,
  deviceType: DeviceType,
  frameSchema?: INodeSchema,
  canvasConfig?: ICanvasConfig,
  menu?: any,
}