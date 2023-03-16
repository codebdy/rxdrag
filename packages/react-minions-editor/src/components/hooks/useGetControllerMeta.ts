import { useCallback } from "react"
import { useControllerNodes } from "./useControllerNodes"
import { IControllerMeta } from "@rxdrag/schema"

export function useGetControllerMeta() {
  const controllerNodes = useControllerNodes()
  const getControllerMeta = useCallback((controllerId: string) => {
    for (const node of controllerNodes) {
      const controllerMeta = node.meta["x-controller"] as IControllerMeta | undefined
      if (controllerMeta?.id === controllerId) {
        return controllerMeta
      }
    }
  }, [controllerNodes])

  return getControllerMeta
}