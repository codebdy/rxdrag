import { useCallback } from "react";
import { getAllMaterial } from "@rxdrag/react-shell-antd/materials";

export function useGetMaterial() {
  const getMaterial = useCallback((name?: string) => {
    const materials = getAllMaterial()
    return materials.find(reaction => reaction.name === name)
  }, [])

  return getMaterial
}