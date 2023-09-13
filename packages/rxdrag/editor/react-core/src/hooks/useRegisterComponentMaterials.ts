import { IComponentMaterial } from "../interfaces";
import { useCallback } from "react";
import { useDesignerEngine } from "./useDesignerEngine";

export function useRegisterComponentMaterials() {
  const engine = useDesignerEngine()

  const register = useCallback((...materials: IComponentMaterial[]) => {
    engine?.registerMaterials(materials)
  }, [engine])

  return register
}