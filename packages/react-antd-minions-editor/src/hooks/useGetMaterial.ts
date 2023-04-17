import { useCallback } from "react";
import {useMaterials} from "@rxdrag/react-minions";

export function useGetMaterial() {
  const materials = useMaterials()
  const getMaterial = useCallback((name?: string) => {
    return materials.find(reaction => reaction.name === name)
  }, [])

  return getMaterial
}