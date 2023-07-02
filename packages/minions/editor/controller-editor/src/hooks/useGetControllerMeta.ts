import { useCallback } from "react"
import { useAllControllerMetas } from "./useAllControllerMetas"

export function useGetControllerMeta() {
  const controllerMetas = useAllControllerMetas()
  const getControllerMeta = useCallback((controllerId: string) => {
    for (const ctrl of controllerMetas||[]) {
      if (ctrl?.id === controllerId) {
        return ctrl
      }
    }
  }, [controllerMetas])

  return getControllerMeta
}