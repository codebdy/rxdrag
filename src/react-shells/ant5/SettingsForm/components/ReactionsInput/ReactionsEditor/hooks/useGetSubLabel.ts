import { useCallback } from "react";
import { IConfigMeta, IControllerMeta, IReactionNodeMeta } from "runner/reaction/interfaces/metas";
import { useControllerNodes } from "./useControllerNodes";

export function useGetSubLabel() {
  const controllerNodes = useControllerNodes()

  const getLabel = useCallback((nodeMeta: IReactionNodeMeta<IConfigMeta>) => {
    if (nodeMeta.config?.fieldName) {
      return nodeMeta.config?.fieldName
    }
    const controllerNode = controllerNodes.find(node => (node.meta?.["x-reactions"] as IControllerMeta | undefined)?.id === nodeMeta.config?.controllerId && nodeMeta.config?.controllerId)
    const controller = controllerNode?.meta?.["x-reactions"] as IControllerMeta | undefined
    console.log("哈哈 useGetSubLabel0", controllerNodes, nodeMeta.id, controllerNode)
    if (controller) {
      for (const reaction of controller.reactions || []) {
        if (reaction.id && reaction.id === nodeMeta.config?.reactionRef) {
          return controller.name || controllerNode?.title + "/" + reaction.label || reaction.name
        }
      }
      return controller.name || controllerNode?.title + "/" + nodeMeta.config?.reactionRef
    }
    return undefined
  }, [controllerNodes])

  return getLabel
}