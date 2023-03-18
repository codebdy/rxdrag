import { IReactionMeta, IConfigMeta, IControllerMeta } from "@rxdrag/schema";
import { useCallback } from "react";
import { useControllerNodes } from "../../../react-shell-antd/src/SettingsForm/components/ReactionsInput/hooks/useControllerNodes";
import { useGetMaterial } from "./useGetMaterial";

export function useGetSubLabel() {
  const controllerNodes = useControllerNodes()
  const currentNode = useCurrentNode()
  const getMaterial = useGetMaterial()

  const getLabel = useCallback((nodeMeta: IReactionMeta<IConfigMeta>) => {
    const material = getMaterial(nodeMeta.materialName)
    const subTitle = material?.subTitle?.(nodeMeta.config)
    const controllerNode = controllerNodes.find(node => (node.meta?.["x-controller"] as IControllerMeta | undefined)?.id === nodeMeta.config?.controllerId && nodeMeta.config?.controllerId)
    const controller = controllerNode?.meta?.["x-controller"] as IControllerMeta | undefined
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