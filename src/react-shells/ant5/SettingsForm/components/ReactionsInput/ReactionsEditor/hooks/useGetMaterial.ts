import { useCallback } from "react";
import { auxReactions } from "react-shells/ant5/materials/auxtools";
import { basicReactions } from "react-shells/ant5/materials/basic";
import { commonReactions } from "react-shells/ant5/materials/common";
import { controllerReactions } from "react-shells/ant5/materials/controllerReactions";

export function useGetMaterial() {
  const getMaterial = useCallback((name: string) => {
    return [...basicReactions, ...auxReactions, ...commonReactions, ...controllerReactions].find(reaction => reaction.name === name)
  }, [])

  return getMaterial
}