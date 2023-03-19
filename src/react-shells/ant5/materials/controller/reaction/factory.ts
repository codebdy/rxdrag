import { ReactionFactory, IReactionMeta, IReactionFactoryOptions, IConfigMeta } from "runner/minions"
import { CodeReaction } from "./CodeReaction"
import { GraphicalReaction } from "./GraphicalReaction"


export const ControllerReaction: ReactionFactory = (meta: IReactionMeta<IConfigMeta>, options: IReactionFactoryOptions) => {
  if (!meta?.config?.controllerId) {
    throw new Error("No controller id when create controller reaction by ReactionFactory")
  }
  const defineMeta = options?.controllers?.[meta?.config?.controllerId]?.meta.reactions?.find(reactionMeta=>reactionMeta.id === meta.config?.reactionRef)
  if (defineMeta?.logicMetas) {
    return new GraphicalReaction(defineMeta, options, meta)
  } else if (defineMeta?.jsCode) {
    return new CodeReaction(defineMeta)
  } else{
    throw new Error("No implement on Controller reaction meta")
  }
}