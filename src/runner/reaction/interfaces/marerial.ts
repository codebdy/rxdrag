import { INodeSchema } from "core";
import { IReaction } from "runner/reaction/interfaces/interfaces";

export interface IReactionMaterial {
  //唯一名称
  name: string,
  title?: string,
  icon?: React.ReactNode,
  color?: string,
  reaction?: IReaction,
  schema?: INodeSchema
}