import { useCallback } from "react";
import { auxReactions } from "react-shells/ant5/materials/auxtools";
import { basicReactions } from "react-shells/ant5/materials/basic";
import { commonReactions } from "react-shells/ant5/materials/common";
import { defaultReactions } from "react-shells/ant5/materials/defaultReactions";

export function useGetMaterial() {
  const getMaterial = useCallback((name: string) => {
    return [...basicReactions, ...auxReactions, ...commonReactions, ...defaultReactions].find(reaction => reaction.name === name)
  }, [])

  return getMaterial
}