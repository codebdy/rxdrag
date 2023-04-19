import { INodeSchema } from '../node';
import { IReaction } from './controller';
import {
  IConfigMeta,
  IReactionMeta,
  IReactionNodeData,
  ReactionType
} from './meta';

export type ReactionFactory<IReactionFactoryOptions = unknown> = (
  meta: IReactionMeta<IConfigMeta>,
  options: IReactionFactoryOptions
) => IReaction;

export interface IReactionMaterial<ComponentNode = unknown> {
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
  reaction?: ReactionFactory;
}

export interface ReactionMaterialCategory<ComponentNode = unknown> {
  name: string;
  materials: IReactionMaterial<ComponentNode>[];
}
