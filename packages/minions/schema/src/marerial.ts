import { ActivityType, IPortDefine } from "./dsl";

export interface IActivityMaterial<ComponentNode = unknown, NodeSchema = unknown> {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subTitle?: (config?: any, options?: any) => string | undefined;
  activityName: string;
}

export interface ActivityMaterialCategory<ComponentNode = unknown> {
  name: string;
  materials: IActivityMaterial<ComponentNode>[];
}
