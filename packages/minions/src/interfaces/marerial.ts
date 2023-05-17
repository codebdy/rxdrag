import { ActivityType, IPortDefine } from "./dsl";

export interface IActivityMaterial<ComponentNode = unknown, NodeSchema = unknown> {
  //唯一名称
  name: string;
  label: string;
  activityType: ActivityType;
  icon?: ComponentNode;
  color?: string;
  //属性面板配置
  schema?: NodeSchema;
  defaultPorts?: {
    inPorts?: IPortDefine[];
    outPorts?: IPortDefine[];
  };
  subTitle?: (config?: unknown) => string | undefined;
  activityName: string;
}

export interface ActivityMaterialCategory<ComponentNode = unknown> {
  name: string;
  materials: IActivityMaterial<ComponentNode>[];
}
