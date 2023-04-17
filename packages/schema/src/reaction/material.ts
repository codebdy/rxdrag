import { INodeSchema } from '../node';
import { IReaction } from './controller';
import {
  IConfigMeta,
  IReactionMeta,
  IReactionNodeData,
  ReactionType
} from './meta';

export type ReactionFactory<IReactionFactoryOptions = any> = (
  meta: IReactionMeta<IConfigMeta>,
  options: IReactionFactoryOptions
) => IReaction;

export interface IReactionMaterial<ComponentNode = any> {
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

export interface ReactionMaterialCategory<ComponentNode = any> {
  name: string;
  materials: IReactionMaterial<ComponentNode>[];
}
