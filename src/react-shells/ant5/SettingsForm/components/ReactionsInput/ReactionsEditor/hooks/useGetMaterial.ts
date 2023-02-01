import { useCallback } from "react";
import { reactionMaterials } from "react-shells/ant5/materials";
import { controllerReactions } from "react-shells/ant5/materials/controllerReactions";
import { IReactionMaterial } from "runner/reaction/interfaces/material";

export function useGetMaterial() {
  const getMaterial = useCallback((name: string) => {
    const materials: IReactionMaterial[] = [...controllerReactions]
    return materials.concat(...reactionMaterials.map(category => category.materials)).find(reaction => reaction.name === name)
  }, [])

  return getMaterial
}