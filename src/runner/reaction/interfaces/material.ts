import { INodeSchema } from "core";
import { IReaction, ReactionFactory } from "runner/reaction/interfaces/controller";
import { IConfigMeta, IReactionNodeData, ReactionType } from "./metas";

export interface IReactionMaterial {
  //唯一名称
  name: string,
  label: string,
  reactionType: ReactionType,
  icon?: React.ReactNode,
  color?: string,
  reaction?: IReaction,
  schema?: INodeSchema,
  meta?: IReactionNodeData,
  subTitle?: (config?: IConfigMeta) => string | undefined,
  reactionFactory?: ReactionFactory
}