import { useCallback } from "react";
import { Identifier } from "../dnd";
import { useGetFlattenItem } from "./useGetFlattenItem";

//获取activid item 的parent
export function useGetParent() {
  const getItem = useGetFlattenItem()
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