
export interface IActivityMaterial<ComponentNode = unknown, NodeSchema = unknown> {
  //唯一名称
  name: string;
  label: string;
  activityType: ActivityType;
  icon?: ComponentNode;
  color?: string;
  schema?: NodeSchema;
  meta?: IReactionNodeData;
  subTitle?: (config?: IConfigMeta) => string | undefined;
  activityName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //reaction?: ActivityFactory<any>;
}

export interface ActivityMaterialCategory<ComponentNode = unknown> {
  name: string;
  materials: IActivityMaterial<ComponentNode>[];
}
