import { useCallback } from "react";
import { basicReactions } from "react-shells/ant5/materials/basic";

export function useGetMaterial() {
  const getMaterial = useCallback((name: string) => {
    return basicReactions.find(reaction => reaction.name === name)
  }, [])

  return getMaterial
}