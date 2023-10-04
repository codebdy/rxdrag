import { useCallback } from "react";
import { useMaterialsState } from "./useMaterialsState";
import { IActivityMaterial } from "@rxdrag/minions-schema";

export function useRegisterMaterial() {
  const [, setMaterials] = useMaterialsState()

  const register = useCallback((material: IActivityMaterial | undefined) => {
    if (material) {
      setMaterials(materials => [...materials.filter(m => m.activityName !== material.activityName), material])
    }
  }, [setMaterials])

  return register
}