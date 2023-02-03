import { useCurrentNode } from "core-react/hooks/useCurrentNode";
import { useCallback } from "react";
import { IConfigMeta, IControllerMeta, IReactionNodeMeta } from "runner/reaction/interfaces/metas";
import { useControllerNodes } from "./useControllerNodes";

export function useGetSubLabel() {
  const controllerNodes = useControllerNodes()
  const currentNode = useCurrentNode()

  const getLabel = useCallback((nodeMeta: IReactionNodeMeta<IConfigMeta>) => {
    if (nodeMeta.config?.fieldName) {
      return nodeMeta.config?.fieldName
    }
    const controllerNode = controllerNodes.find(node => (node.meta?.["x-reactions"] as IControllerMeta | undefined)?.id === nodeMeta.config?.controllerId && nodeMeta.config?.controllerId)
    const controller = controllerNode?.meta?.["x-reactions"] as IControllerMeta | undefined
    console.log("哈哈 useGetSubLabel", controller, controllerNodes, nodeMeta.config?.controllerId)
    if (controller) {
      // for (const reaction of controller.reactions || []) {
      //   console.log("哈哈 useGetSubLabel0", reaction, nodeMeta.config?.reactionRef)
      //   if (reaction.id && reaction.id === nodeMeta.config?.reactionRef) {
      //     return controller.name || controllerNode?.title + "/" + reaction.label || reaction.name
      //   }
      // }
      
    }
    return currentNode?.id !== controllerNode?.id ? controller?.name || controllerNode?.title : undefined
  }, [controllerNodes, currentNode?.id])

  return getLabel
}