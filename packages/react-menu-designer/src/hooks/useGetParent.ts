import { useCallback } from "react";
import { Identifier } from "../dnd";
import { useGetItem } from "./useGetItem";

export function useGetParent() {
  const getItem = useGetItem()
  const getParent = useCallback((belowAtId: Identifier, depth: number) => {
    const belowAtItem = getItem(belowAtId)
    if (belowAtItem && (belowAtItem.depth === depth - 1)) {
      return belowAtItem
    } else if (belowAtItem?.parentId) {
      return getParent(belowAtItem?.parentId, depth)
    }
  }, [getItem])

  return getParent
}