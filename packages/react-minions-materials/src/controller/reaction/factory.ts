import { IActivityFactoryOptions, GraphicalReaction } from "@rxdrag/minions"
import { ActivityFactory, IReactionMeta, IConfigMeta } from "@rxdrag/schema"
import { CodeReaction } from "./CodeReaction"


export const ControllerReaction: ActivityFactory = (meta: IReactionMeta<IConfigMeta>, options: IActivityFactoryOptions) => {
  if (!meta?.config?.controllerId) {
    throw new Error("No controller id when create controller reaction by ActivityFactory")
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