import { INodeSchema } from '../node';
import { IActivity } from './controller';
import {
  IConfigMeta,
  IActivityDefine,
  IReactionNodeData,
  ActivityType
} from './meta';

export type ActivityFactory<IActivityFactoryOptions = unknown> = (
  meta: IActivityDefine<IConfigMeta>,
  options: IActivityFactoryOptions
) => IActivity;

export interface IActivityMaterial<ComponentNode = unknown> {
  //唯一名称
  name: string;
  label: string;
  reactionType: ActivityType;
  icon?: ComponentNode;
  color?: string;
  //reaction?: IActivity,
  schema?: INodeSchema;
  meta?: IReactionNodeData;
  subTitle?: (config?: IConfigMeta) => string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reaction?: ActivityFactory<any>;
}

export interface ActivityMaterialCategory<ComponentNode = unknown> {
  name: string;
  materials: IActivityMaterial<ComponentNode>[];
}
