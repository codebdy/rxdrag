import { ReactionFactory, IReactionMeta, IReactionFactoryOptions, IConfigMeta, IReactionDefineMeta } from "runner/reaction"
import { CodeReaction } from "./CodeReaction"
import { GraphicalReaction } from "./GraphicalReaction"


export const ControllerReaction: ReactionFactory = (meta: IReactionMeta<IConfigMeta>, options?: IReactionFactoryOptions) => {
  if (!meta?.config?.controllerId) {
    throw new Error("No controller id when create controller reaction by ReactionFactory")
  }
  const defineMeta: IReactionDefineMeta | undefined = options?.controllers?.[meta?.config?.controllerId]
  if (defineMeta?.logicMetas) {
    return new GraphicalReaction(defineMeta, options)
  } else if (defineMeta?.jsCode) {
    return new CodeReaction(defineMeta)
  } else{
    throw new Error("No implement on Controller reaction meta")
  }
}