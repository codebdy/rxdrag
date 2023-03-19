import { useMemo, ReactNode } from "react";
import { useMaterialCategories } from "./useMaterialCategories";
import { IReactionMaterial } from "@rxdrag/schema"

export function useMaterials() {
  const categories = useMaterialCategories()
  const materials = useMemo(() => {
    const mts: IReactionMaterial<ReactNode>[] = []
    return mts.concat(...categories.map(cat => cat.materials))
  }, [])
  return materials
}