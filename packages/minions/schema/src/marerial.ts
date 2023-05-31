import { ActivityType, IPortDefine } from "./dsl";

export interface IPorts {
  inPorts?: IPortDefine[];
  outPorts?: IPortDefine[];
}

export interface IActivityMaterial<ComponentNode = unknown, NodeSchema = unknown, Config = unknown, MaterialContext = unknown> {
  label: string;
  activityType: ActivityType;
  icon?: ComponentNode;
  color?: string;
  //属性面板配置
  schema?: NodeSchema;
  defaultPorts?: IPorts;
  subTitle?: (config?: Config, context?: MaterialContext) => string | undefined;
  activityName: string;
}

export interface ActivityMaterialCategory<ComponentNode = unknown, NodeSchema = unknown, Config = unknown, MaterialContext = unknown> {
  name: string;
  materials: IActivityMaterial<ComponentNode, NodeSchema, Config, MaterialContext>[];
}
