import { NodeType, IPortDefine } from "./dsl";

export interface IPorts {
  inPorts?: IPortDefine[];
  outPorts?: IPortDefine[];
}

/**
 *                     **重要提醒**
 * =======================================================
 *    React时，因为x6的问题，多个path的时候，
 *    icon的path 一定要加key
 * =======================================================
 * 
 */
export interface IActivityMaterial<ComponentNode = unknown, NodeSchema = unknown, Config = unknown, MaterialContext = unknown> {
  label: string;
  activityType: NodeType;
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
