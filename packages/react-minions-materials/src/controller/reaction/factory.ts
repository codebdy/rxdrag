import { IActivityFactoryOptions, GraphicalActivity } from "@rxdrag/minions"
import { ActivityFactory, IActivityDefine, IConfigMeta } from "@rxdrag/schema"


export const ControllerReaction: ActivityFactory<IActivityFactoryOptions> = (meta: IActivityDefine<IConfigMeta>, options: IActivityFactoryOptions) => {
  if (!meta?.config?.controllerId) {
    throw new Error("No controller id when create controller reaction by ActivityFactory")
  }
  const defineMeta = options?.controllers?.[meta?.config?.controllerId]?.meta.reactions?.find(reactionMeta => reactionMeta.id === meta.config?.reactionRef)
  if (defineMeta) {
    return new GraphicalActivity(defineMeta, options, meta)
  } else {
    throw new Error("No implement on Controller reaction meta")
  }
}