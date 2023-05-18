import { useCallback } from "react";
import { useMaterials } from "./useMaterials";

export function useGetMaterial() {
  const materials = useMaterials()
  const getMaterial = useCallback((name?: string) => {
    return materials.find(reaction => reaction.name === name)
  }, [materials])

  return getMaterial
}