import { controllerReactions, reactionMaterialCategories } from "@rxdrag/react-minions-materials";
import { IReactionMaterial } from "@rxdrag/schema";
import { ReactNode } from "react";

export function getReactionMaterials() {
  const mts: IReactionMaterial<ReactNode>[] = []
  return [...mts.concat(...reactionMaterialCategories.map(cat => cat.materials)), ...controllerReactions]
}