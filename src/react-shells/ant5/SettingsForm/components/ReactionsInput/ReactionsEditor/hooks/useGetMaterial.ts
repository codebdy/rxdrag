import { useCallback } from "react";
import { getAllMaterial } from "react-shells/ant5/materials";

export function useGetMaterial() {
  const getMaterial = useCallback((name?: string) => {
    const materials = getAllMaterial()
    return materials.find(reaction => reaction.name === name)
  }, [])

  return getMaterial
}