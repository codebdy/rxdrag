import { INodeSchema } from '../node';
import { IReaction } from './controller';
import {
  IConfigMeta,
  IReactionMeta,
  IReactionNodeData,
  ReactionType
} from './meta';

export type ActivityFactory<IActivityFactoryOptions = unknown> = (
  meta: IReactionMeta<IConfigMeta>,
  options: IActivityFactoryOptions
) => IReaction;

export interface IActivityMaterial<ComponentNode = unknown> {
  //唯一名称
  name: string;
  label: string;
  reactionType: ReactionType;
  icon?: ComponentNode;
  color?: string;
  //reaction?: IReaction,
  schema?: INodeSchema;
  meta?: IReactionNodeData;
  subTitle?: (config?: IConfigMeta) => string | undefined;
  reaction?: ActivityFactory;
}

export interface ActivityMaterialCategory<ComponentNode = unknown> {
  name: string;
  materials: IActivityMaterial<ComponentNode>[];
}
