import { INodeSchema } from "core";
import { ReactionFactory } from "runner/minions/interfaces/controller";
import { IConfigMeta, IReactionNodeData, ReactionType } from "./metas";

export interface IReactionMaterial {
  //唯一名称
  name: string,
  label: string,
  reactionType: ReactionType,
  icon?: React.ReactNode,
  color?: string,
  //reaction?: IReaction,
  schema?: INodeSchema,
  meta?: IReactionNodeData,
  subTitle?: (config?: IConfigMeta) => string | undefined,
  reaction?: ReactionFactory
}