import { INodeSchema } from "../node";
import { IReaction } from "./controller";
import { IConfigMeta, IReactionMeta, IReactionNodeData, ReactionType } from "./meta";

export type ReactionFactory<IReactionFactoryOptions = any> = (meta: IReactionMeta<IConfigMeta>, options: IReactionFactoryOptions) => IReaction

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
