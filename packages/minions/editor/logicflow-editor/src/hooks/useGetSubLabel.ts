import { useCallback } from "react";
import { useGetMaterial } from "./useGetMaterial";
import { IActivityDefine } from "@rxdrag/minions-schema";

export function useGetSubLabel() {
  const controllers = useAllControllers()
  const currentController = useController()
  const getMaterial = useGetMaterial()

  const getLabel = useCallback((nodeMeta: IActivityDefine<unknown>) => {
    const material = getMaterial(nodeMeta.materialName)
    const subTitle = material?.subTitle?.(nodeMeta.config)
    const controller = controllers.find(ctrl => ctrl?.id === nodeMeta.config?.controllerId && nodeMeta.config?.controllerId)

    const controllerLabel = currentController?.id !== controller?.id ? controller?.name : undefined
    if (controllerLabel) {
      if (subTitle) {
        return controllerLabel + ">" + subTitle
      }
      return controllerLabel + ">"
    } else {
      return subTitle
    }
  }, [controllers, currentController?.id, getMaterial])

  return getLabel
}