import { ReactionFactory, IReactionMeta, IReactionFactoryOptions, IConfigMeta } from "runner/reaction"
import { GraphicalReaction } from "./GraphicalReaction"

export const Reaction: ReactionFactory = (meta: IReactionMeta<IConfigMeta>, options?: IReactionFactoryOptions) => {
  //if(meta.)
  return new GraphicalReaction(meta, options?.materials||[], options)
}