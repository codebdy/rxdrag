import { useCurrentNode } from "core-react/hooks/useCurrentNode";
import { useCallback } from "react";
import { IConfigMeta, IControllerMeta, IReactionMeta } from "runner/minions/interfaces/metas";
import { useControllerNodes } from "./useControllerNodes";
import { useGetMaterial } from "./useGetMaterial";

export function useGetSubLabel() {
  const controllerNodes = useControllerNodes()
  const currentNode = useCurrentNode()
  const getMaterial = useGetMaterial()

  const getLabel = useCallback((nodeMeta: IReactionMeta<IConfigMeta>) => {
    const material = getMaterial(nodeMeta.materialName)
    const subTitle = material?.subTitle?.(nodeMeta.config)
    const controllerNode = controllerNodes.find(node => (node.meta?.["x-reactions"] as IControllerMeta | undefined)?.id === nodeMeta.config?.controllerId && nodeMeta.config?.controllerId)
    const controller = controllerNode?.meta?.["x-reactions"] as IControllerMeta | undefined
    const controllerLabel = currentNode?.id !== controllerNode?.id ? controller?.name || controllerNode?.title : undefined
    if (controllerLabel) {
      if (subTitle) {
        return controllerLabel + ">" + subTitle
      }
      return controllerLabel + ">"
    } else {
      return subTitle
    }
  }, [controllerNodes, currentNode?.id, getMaterial])

  return getLabel
}