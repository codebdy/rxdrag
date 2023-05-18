import { useCallback } from "react"
import { useAllControllers } from "./useAllControllers"

export function useGetControllerMeta() {
  const controllerMetas = useAllControllers()
  const getControllerMeta = useCallback((controllerId: string) => {
    for (const ctrl of controllerMetas) {
      if (ctrl?.id === controllerId) {
        return ctrl
      }
    }
  }, [controllerMetas])

  return getControllerMeta
}